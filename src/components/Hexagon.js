import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Doto } from 'next/font/google';

// Import the Doto font
const doto = Doto({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const Hexagon = () => {
  const svgRef = useRef(null);
  const [hoveredText, setHoveredText] = useState({ name: "", description: "" }); // Track hovered text
  const [displayedText, setDisplayedText] = useState(""); // For typewriter effect
  const rotationSpeed = 0.0007;
  const width = 500, height = 500;
  const radius = 150;
  const pointRadius = 35; // Clickable circle radius
  const center = { x: width / 2, y: height / 2 };
  

  // Typewriter effect
  useEffect(() => {
    if (!hoveredText.name) {
      setDisplayedText(""); // Reset text if nothing is hovered
      return;
    }

    const fullText = `${hoveredText.name}: ${hoveredText.description}`;
    let currentIndex = 0;

    const typewriterInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, 30); // Increased speed (30ms per character)

    return () => clearInterval(typewriterInterval);
  }, [hoveredText]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    let angleOffset = 0;

    // Image logo
    svg.append("image")
      .attr("href", "/logo solo.svg") // Replace with actual path
      .attr("width", 100)
      .attr("height", 100)
      .style("opacity", "55%")
      .attr("x", center.x - 50) // Centering the image (half the width)
      .attr("y", center.y - 40)
      .attr("pointer-events", "none"); // So it doesn't interfere with hover


    // Hexagon point names and descriptions
    const pointData = [
      { name: "Innovación", description: "Creación de nuevas ideas y tecnologías." },
      { name: "Escalabilidad", description: "Capacidad de crecer sin perder eficiencia." },
      { name: "Tecnología", description: "Uso de herramientas digitales avanzadas." },
      { name: "Performance", description: "Optimización del rendimiento del sistema." },
      { name: "Experiencia", description: "Diseño centrado en el usuario y su interacción." },
      { name: "Creatividad", description: "Soluciones artísticas y originales." }
    ].map(point => ({
      ...point,
      name: point.name.toUpperCase() // Convert the name to uppercase
    }));

    // Initialize hexagon points
    const points = pointData.map((point, i) => ({
      ...point,
      angle: (i * Math.PI) / 3 + angleOffset,
      x: center.x + radius * Math.cos((i * Math.PI) / 3),
      y: center.y + radius * Math.sin((i * Math.PI) / 3),
    }));

    // Append hexagon shape
    const polygon = svg.append("polygon")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", "1, 2")
      .attr("opacity", 0.9);

    // Append text labels (centering vertically)
    const texts = svg.selectAll("text")
      .data(points)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .style("fill", "black")
      .style("font-size", "0.8rem")
      .attr("class", doto.className)  // Apply the Doto font class
      .style("font-family", "'Doto', sans-serif")
      .style("font-weight", "bold")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .text(d => d.name);

    // Append clickable circles with border and transparent background
    const circles = svg.selectAll("circle.point")
      .data(points)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("r", pointRadius * 1.5) // Start larger
      .attr("fill", "transparent")
      .attr("stroke", "gray") // Add white border
      .attr("stroke-width", 1) // Thinner border
      .attr("opacity", 0) // Invisible but clickable
      .style("cursor", "pointer")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition().duration(200)
          .attr("opacity", 1) // Make the circle visible
          .attr("r", pointRadius); // Scale down the circle to original size
        
        // Add '>' symbol next to the text
        const text = svg.selectAll("text")
          .filter(t => t.name === d.name)
          .text(d.name + " >")
          .transition().duration(200)
          .style("opacity", 1); // Fade in the symbol

        // Update hovered text
        setHoveredText({ name: d.name, description: d.description });
      })
      .on("mouseout", function (event, d) {
        d3.select(this)
          .transition().duration(200)
          .attr("opacity", 0) // Make the circle invisible again
          .attr("r", pointRadius * 1.5); // Scale up the circle back to larger size
        
        // Remove '>' symbol when mouse leaves
        const text = svg.selectAll("text")
          .filter(t => t.name === d.name)
          .text(d.name)
          .transition().duration(200)
          .style("opacity", 0.7); // Fade out the symbol

        // Clear hovered text
        setHoveredText({ name: "", description: "" });
      });

    // Update function to animate rotation
    function update() {
      angleOffset += rotationSpeed;

      points.forEach((d, i) => {
        d.angle = (i * Math.PI) / 3 + angleOffset;
        d.x = center.x + radius * Math.cos(d.angle);
        d.y = center.y + radius * Math.sin(d.angle);
      });

      polygon.attr("points", points.map(d => `${d.x},${d.y}`).join(" "));
      texts.attr("x", d => d.x).attr("y", d => d.y).text(d => d.name);
      circles.attr("cx", d => d.x).attr("cy", d => d.y);
    }

    // Start rotation loop
    const timer = d3.timer(() => update());

    return () => timer.stop();
  }, []);

  return (
    <div style={{ position: "relative", textAlign: "center", height: '100vh' }}>
      {/* Textbox above the hexagon */}
      <div
        style={{
          position: "fixed",
          top: `50vh`, // Position above the hexagon (adjust as needed)
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "left",
          opacity: hoveredText.name ? 1 : 0, // Fade in/out based on hover state
          transition: "opacity 0.3s ease-in-out",
          color: "black",
          fontSize: "1.2rem",
          fontFamily: "'Doto', sans-serif",
          fontWeight: "400",
          border: "1px solid black", // White border
          padding: "10px 20px",
          borderRadius: "0px",
          pointerEvents: "none", // Ensure the textbox doesn't interfere with hover
          background: "white", // No background
          width: "auto",
        }}
      >
        {displayedText}
      </div>

      {/* Hexagon SVG */}
      <svg ref={svgRef} width={width} height={height} style={{ display: "block", margin: "auto" }} />
    </div>
  );
};

export default Hexagon;
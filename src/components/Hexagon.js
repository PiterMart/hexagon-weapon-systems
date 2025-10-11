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
  const [showFlash, setShowFlash] = useState(false); // Flash animation state
  const [flashText, setFlashText] = useState(''); // Flash text content
  const rotationSpeed = 0.0007;
  const width = 500, height = 500;
  const radius = 150;
  const pointRadius = 35; // Clickable circle radius
  const center = { x: width / 2, y: height / 2 };
  

  // Handle click on hexagon points
  const handlePointClick = (point) => {
    // Set the flash text to the specific text
    setFlashText('A̵̦̻͇͕̣͎͎̋͆̽͐͆̓̈́̌̚͠͝ľ̸̡̪̼̫̝͚̱̜̞̬̬̠̤͓̊̎͂̌͜7̶̨̭̼̪̣͈̝͔̜̮͇̟̝̎̑̈́̓͝0̷̧̡̲̟̘̭̲̝͉͎̝̦̐̅͐!̸̬̘̤͓̃̊̆̈́͑̚!̸̨͍̺͇̫̩̪͍̼͗͑́̒͆͠!̴͈͖͖͙̪͇̈́͋̒͊̋̉̃̒̕͜');
    setShowFlash(true);

    // After animation, hide everything
    setTimeout(() => {
      setShowFlash(false);
    }, 1000); // 1 second flash duration
  };

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
    }, 1); // Increased speed (30ms per character)

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
      { name: "L̵̛̹̺̟̰̼̙͔͓̠̀̓̀͋̇̉̀̆̌̊̉̌͋̕e̶̢͚͗̅̾̄̈́͊͒̓͜t̶̜̰̪͖̳̲̦̜͇͎̩̋͗̅̂͐͌̂̌̕͠ͅa̷̢̱̼̜̥͙̥̥̅̀l̶͉̭̠̳̩̩̦̜̾̈́̔̈̒̋͘͠ḯ̸͕͐͒̂͂̀̈́͑̓͆͛̈́̀͆́͗͠d̷̡̦̥̠̤̊̈̊ą̵́̿͒̆͝d̷̡̨̧͕̪͉̦̠̝̬͂̐̅̒͛͛̂͜ͅ", description: "" },
      { name: "ḑ̵̨̨̨̡̧̡̢̡̧̢̢̡̡̡̢̢̨͙̝̘͚͈̼͈͎̫͚̣̬̦̺͚̝̞̰̣̮͉̟̖͉͙̗̖͍̜̠̦̙͈̞̱̬̭͚̩̪̳͔̫̩̮̠̻̭̩͙͚̜̤͚̪̦̲͙̲̬̱͖̠̤̙͔͙͎̼͎̱͔̬͕̯͚̥̝̬̯̯͉̼̟͇͇̥̬͙͚͖͙̳͖͈̰͉͙̯̥̩̠̙̞͉͔̼͇̥̫̺͍̙̙̣̥̹̟͉̘͚͙̲̬̦̟̻̮̞͔̣̟͖̝̪͔̺̖͖̯̗͓͔̠͇̼̗̩̲͔̩̱̳̦̤̤̫̩͖̺̩̹̥̹̞̟͉͇̫̭̪̬̬̦̳̤̣̦̮̙̩̟̻͈̟̀͐̉͘͜͜͜͜͜͜͜͠͝ͅͅͅͅͅŕ̷̢̡̧̢̨̧̢̢̢̢̢̡̧̢̡̧̛̛̛̛̛̠͕̣̟̗̘͙̘̦̼͎̺̭̦̭̼͉͓̠̫̘̬̙̱̺̮̥͉̲̱͇̲̳͓̹̠͇̯̻͈̱̻͕̙͔͔̳̞͙̻͚͖͉̦͇̤͕͈̦̤̟̭̺̭̦̱̝͔̳̟̤̙͖̰͔̙̬͓̮̙̹͇͓̹̱̝͍͖̘̺̮̟̫̻͓̯̲͍̱͔͔̗̪̤͖̜̣̠̗̺̤̟͈̬̬̟̥̭̥̺̜̗͔̜̳͔͙͔̯̝͚̤̞̯̫̤͙̈͒͒͒͐̐͋̋͊͋͐͑̓̈́̌͒͗̌̐̍͒̾̉̓̇́͂̈́̄̇̊̔̽̍́͆͐͋̐̈́͑̈͒̍̓͌́͛̾͊̅̓̄͊̐͊̉̆̀͑̇́̊͒͗̍͋̿̈͛̈̃͗̌̄̎̅̓͗̅̇̀͆̑͒͆͊̄́͛͊̒͊̿͗̊̎̈́̔̍̒̈́̉̉̔̐̔͒̎̈́́̈́̓̽̽̓͂̎̅̄̍̇̀̔̐̾̍̎͆̽̄̉͐̍̐̓̒̐̑̀̽̎̓̄̽͒̔̇́̿̈́̂͐̒̀̕̚͘̕͘̚̚̚̚͜͜͜͝͝͝͝͝͠͝͠͠͝͝͝ͅͅơ̸̡̧̨̡̧̡̨̢̨̛̛̛̻̻̯̬̰͔̭͎̤̣͎͎̗̰͍̟͚̣͎͎̱͉͖̭̥͇̰̙̞͇̱̳̦̱͈̦͓͍̺̪̥̠̖̰͙̗͙̪̼̳͈̻̝̙̟̲͓̼̱̠͇̭̫͇̯͚̗̭̻̼̞̺̦̗͓̳̦͍̘͓͍͔̗͇̱͔̣͓̠̙͔̥̩̺͈͕̣̘͈̥̱͔̝̬͙̼͚͖̫̈́̌͌̈́̍͊͐̍̿̎̓̒̀͌͊̄̇̅̌̂͂̄͆͂͒̍͐̅͆̋̐̊͂̂́͌͌̀̈́̅̓͛̇̒̀͒̿̈̐̿̓̒̈̉͊̀̏̈͒̾̂̋͛́̾͗̓́͋̑͒͆͆͆̉̇̏̍̐̒͊͋̑͆̉͊͆̉̐̂̋̄̈́̌̿͒̎̈́̑͊͌͂̒̈́͐̕͘͘͘͘͘̕̕͜͜͜͜͝͠͠ͅͅņ̷̢̡̨̢̢̨̡̡̧̛̛̛̛̛̪̬͉̹̘̻̞̘̤̱̻̙̹̯̺̯̪̱̫̘̘͇̬̱̘̼̪͎̠͙̫̜̦͇̺̰̯̠̣̠̗͔̘̣̦͎̼͉̥͙̥̦̭͎̫̱̻̼͎͕̙̟̳̩̣͉̭̜̥̬̥̺̥̹͎̖̰̪̻̤͍͍̳̩̭̩̜̯͕̠̲̪̫̫̟̟̩̯̳̬̝̬͇͕̞̗̞͕̜͈͈͔͖͎̫͔̱̰̥͇̠̭̲̦͕͖̗͙̖̀̉̀̔̆͊̆̒̓̍̾͐̊́̌̉͊̅̉̔͊̑̈́̉̏̈́̈́̆̈́̈́̆̌̌͛͗̈́̃͐̎̋̅͒̊̽͐̉́̿͒̈́͗͐͒̏͋̐̄̓̀́͛͂͆̾̎̾̆̏͌̾̾̃̓̄̈́̿̉̈̒̿̄̓̆͑̂̓̀̀̾̑͐͌́̈́͊̊̉̓̾̓̌̊̔̃̍͊̈́̿̌͂̆̽̒̈́͂̅́̾̈́̃̎̓̐̀͊͑͋͋̔͒̌̓͆̈́͋̐̄̓̆͂̀̍̉͗̆́́̈́̆̕̕̚̚͘̚͘͘͘̚̚̕̕͘͜͜͜͜͝͝͠͠͝͝͝͠͠ͅͅͅę̴̧̡̢̡̨̨̢̨̢̨̢̨̢̨̡̧̨̨̡̛̛̛̛̛̟͍͙̭̣̞̹̖͖̝͕͔͍̟͖̘̠̙̲̺̹͇͚̠̠̝̬̜̲̘̺̯͎̬͓͈̩̟̘͖͓̲̺͈̪̝͕͓͖̠͚̣͕̼͎̲̯̗͚̻̗̲̣̼͕͇̳͙͙͉̜̝̣̝͖͉͈̮̬̰̘̝̮͙̳̥͎͎̤̙̗̤͍̬̬̯̙̜͙̹͖̭̰̥̜̰̯̖̼̦̜͓̜͍̫̖̭͓̳̟̬̹͈͖̙͓͉̦̯͕͇͕̘̼̩̜̘̘͉̙͔̦͇̫͓̗̩̺̯͇͕̤̫͈̲͙̖̪̪̼̹̫͉̭̬̬͚̙͉̮͈̠̦͙̬̱̟̻̞̹͎̝̤̝͎̙̜̭͛̎̓̓̀͛͐̌̇̽̂͂͗̌̍͛̋̀̔̇͊̽̂͂̏͊͒̐̌͐̀̈́̐̆̿̽̃͐́̈̌̈́̀́͑̃̾͊̏̈́̍̾̓̄͊͛̔̿́̇͐͌͌͛̔͗̐̈́͌̔͌͆̄̑̅̆̍́̌̽̓͆̌̓̄̌͆̋̎̊̃͊͊̐̈́͊̈́̌͗̇̍̈́̐̔̉̉̈́̀̑̇͐̀̃̐̇̈́̊̓͐̃͛̐͊̂̌̅̓̌͐́̒͂̃̈̅̑̉̉̋͛̍͒̓̈́̍͆̋̋̒̈́̏͋̌͂͋̔̄͋̐̀̃̓̓̇̽̽̽͌̊̎͑͒̌͂̈͋́̉̍͗̓̔̽̉̑̿͆́̆̃̇̓̅̕̚̕̕̕̚̚̕͘̚̕̕͜͜͜͜͜͝͠͠͝͠͝͠͝͝͝͝͝ͅs̴̡̥̞̤̗͖̙̟̭̺͔̬̺̙̖̉̉́̽͛͊͊́̿̔͗̐̀̽͐̀͑̽̍͌́̾͗̂̊͆́͂̚̚͠", description: "" },
      { name: "II̶̡̧̧̢̨̢̡̧̢̧̢̡̢̧̧̡̛̛̤͖̰̱̹͈͍̟͙̮̤̹͎͈͙̦͙̞̳͔̱̲̰̩͖̮͈̹̺̦͔̝̹̮͍̬͙͔͇̥͓͕̼̰̯̩̘̮̗̣̰̫̮͈̟̤̱͙̝̟͈̟͖̖̙̳͙̳̼̝̣͇̮̤̘͈̟͖̠̬͔̥̘͈͔̭̹̙̭͔̺͖̖̺̤͉͓̘̙̤̻͕̜̪̦̲͚̻͖̻͈̩̤̦͇̥̘̤̠̦̝̥̹̺̩̣͚̠̪̞̟̻͈̗̝͇̮͇̮̪̲͔̺͔̱͕̗̩͚͕͍̠̺̩̰̋̿̌̒̏̂͑̔́̇̒͊̈́͆͂̾̓̓̎́͑̎́̿́̉̄͛́͂̄̅̋̉̔̋͊̌̍͆͋̿͊̈́͒̊̾̿̆̈́͒̽̌͐͌̒͗̾͛̅͗͗̓́͑͑̔̄̐̈́̔̈́̔́̑̓̅̃̈͂͂̐̊̉̇̉̈̋̓̃͋͋̇̈̔̓͒̈́͂͛͛̉̔̿̿͊͐͌̄́̈́͑͒̒͑̔̀̈́́̍̌͌̔͛͑͗͐̐͒́͋̂͒̋͘̚̕̚̚̕̚͜͜͜͜͠͝͝͠͝͝͠͝͝͠͝ͅͅͅͅͅn̷̨̢̨̡̢̨̨̡̡̧̨̰̗̞͙̝̘͙̣̜̫͓̤̥̫̥͈͎̖̯̱͓̯͈̖͇͓̞͔̟̺̗̙̭̰̥̬̜̺̣̫̙̹̥̰̠͚̘͓͎̞̭̺̙̪̪͈̟̪̯̗͍͎͈͖̺̹͍͓̪̱͈̜̗͍͖̳̘͚̟͕̻̩̪͔̼͎̰͍͕̘̣̫̹̪̯̰͔̠̱͚̦̞̙̘͔̲̗̣̫̝̘̜͉̲̣͎̦͍̻̤͎̹̜̳̱͓̳̹̖͚̗̼̮̳͖̘̔̍͜͜͜ͅͅͅͅͅͅͅͅͅt̴̢̢̧̡̧̡̧̢̨̢̨̛̛̛̛̛̙͚̖̝̬͔̲̳̱̟̜̹̥̥̠̳̦̼̰̟̖̜͇̝̺̗̝͙̲̯̪̗̼̗̰̫̲͙̣̺͉̭̪̩̳̦͚̖̣̫̘̦͉̮̥͕̖̯̜̦̰̺̤̗̯̖̳͇̠̖͕̦̻͈̬̝̳̘͎̥̠̳͇̠̱̮̙̭̩͎̟̗͍̰̬̣̘̺̣̤͙̖͙͔̩̫̺͉̺̻̥͇͈̖͚͖̟̲̫̗̭̭̬̮͚͚̺̹̺̥͔̳͉̯͚͉̘̰͈̩͎͉͇͕̹̹͖̮̲̭̱͎̳̜̫̥̠̟̭̦͓̣͕̩̑̇̉̓͌̑̆̑͗̎̎͂̔̄̊͂̑́̈͗̊̏̒̀̽͑̌̑́͗́̐̈́̍͂̽̅̀̈͑͌͌̅̄̀̈́̍̓̄͗͐̈́̈́̑̂̀̾̐̿͆̓̉̂̔͋̀͆͒́͊͑̕͘͘̕̕̕͘̕̚͜͝͝͝͝͝ͅͅͅͅͅê̶̡̛̛̛̛̛̜̘̾͐̍̽͆̏̎́̓̂̀̈́̔͋̉͌͐́̈́͆͐̏̀̈̇͗̉͐͆̋̓̎̐̃̑̃̿͋̈́̔̈́̆̒̓̽͐́̒̍͆̎̽́̿̌̈́́̏̅̈́͑̄͂͒̎̔̂̅͒̑̈́̐̊̔͒͋̓̈́̐̅̊̏̎̃͆̀̎̂̐̾͗̾̑̽͌̈́́́̽̎̆͑̈͛͐͗̊̃̇̄͋͂̅̄̿́͒̎̈́̌́̆͋̿̓̀̒̑̏̇̊̋̒̈́̎͊̄͒̋̽̋͊͋̄̈́̋̀̿́̎̃̐͗́̈́̈́̊̈́̍̄́̇̇͐̐͑̈́̈̄̎̾̚͘̕͘͘͘̚̚͘͝͠͠͝͠͝͠͠͝͝͠͝͠r̵̨̨̢̡̨̧̢̛͉͕̝̥̤̗̟̱̞̦̗̘̰͙͈̮̩̪̱͈͔͕̖̮͙̲͙͕͓̠̰̘̮̳̘̠̬̝͍̲̭͇̲̐̿̏̑̍͂̀́͒́̎̏̓̉̍͐̈́̋̅͆̒̐͊̒̔́̃̌͐̓̇̀̾͋̀͂̆͒̉͆̇͊̒̈͛̀̄̓̐̾̈̈́͌̐̈͛̓͋̈́̏̏͑̍͗̒̒̌͆̆̔̂̈̎͊͌̄̀́͑̒͑̎́̿̊̑̄̂̊̈̈̍͊̋̊͑̋̓́͌̎͋̔̋͒͐͋̿͑̑͌̽̈́̀̎̅͆͌̋̚̚̚͘͘͘͘̚̕͜͜͜͜͜͜͝͠͝͝͝͝͝͝͝͠͠͝͝͝ǫ̷̢̢̢̧̡̨̛̛̛̛̛̛̛̛̛̛̛͈̠̝͓̻͇̖͙̪̹̝̹̼̝̫͉͍̭̙̮͉͈̰̮̫͙̹̲͚͇̹̩̼̝͔̯͕̻͚̤̻͉̭̣̞̜̱̮̥͇̜̦̟͇̩̯̦̱͖̥̫͔̻̻̬̝͓͕̖̼͖͇̫̭͓̻̗͖̪͖̱̲͈̪̫̙̮̤͕̞̼͍͇͕̮̹̠̞͈͖̣͖̫̣̭̹̜͚͓̰͖̯͈͍̘̬̟͕͍̫̯͙͓͍͙͍̖͔͕͔̞̠̬̞̜͚̇̓̑͛͗̆̎̔̽̆͋͆̆̋̔͛͂́̆̾̽̿͊̀̐̀̅̊̀̓͐̈́̀͒̈́͂͛͆̐̉̄͊̿͑̒̓̈́̏͊̍͒̋̋̈́̃̈͊͊̎͋͌͋̄̀̂͑̆͛͑̎̀̅̀̌̔̑̀̈́̎̊̔͐̐̀͐͊̓̀̔̍͋̃̄̈̾̑͑́͗̑͋̆͊́̈͐͊̅͑͂̓̏͑͐̓͐̈́̅̊̿̀̽͗͐͊̐̅̌̍͆̀̍̂͛̓̍͋́̆̑͗̀̏̆̒̆̀̈́͂̍͐̃̀́́̐̈́̍͂̓̆̀̽̍̿͊́̊̄̋͊̃̊̇́̊̈̆͋̓̃̊̇͘͘̚̚̚̕̕̕͘̚̚̚̕͜͜͜͜͜͝͝͠͠͠͝͝͠͝͝͝͝͝͝ͅͅͅͅͅͅͅp̵̡̧̢̧̢̨̡̛̛͓̦̱̩̫͓̱̼̭̩͕͖̗̞͔̲̲̼͇̲͉͖͙̖̼̳͈̞̩̲̻̮̘̣̝̜̹̤͍͓̣̰̖̹̼̼͙̞̩̣̻̞̙̳̯͔̳̻̭͍̟͔̭̤̠͈͍̠̪͓̣̟̻̞̤̜͓̣̩̮͉̗̖̱͓̯͍͓̤̼̫̜̤̬̮͓̜͓̻͇̮͎͓̫͈̞̱̣̲̭͕͈͇̗͍̦̰̭̮̰̹̰͓͖̜͍̖̲̩̙̜̘͓̙̮͔̪̠̙͍̮̖̻̖̠̳̹͕͚̮͉͕͖̺͇̣̥͔̦͈̰̠̱̺̔̌͛͋́͆͒͗̋̄́̈́͒̏̎̀̒̒̅̍̊̉̊̄͆́͊̔̾̊͊̽̈́̈́͑̉̐͊̎̓̐̽̃̀͒͗̇̓̍̐̀̎̌̿̀̂̐͛̑̓͐͐̔̂͂͂̎̆̈͒̓̚̚̕̚̕͜͜͜͜͜͜͜͜͝͝͝ͅͅe̸̡̧̨̡̧̢̨̧̛̛̛̛̛̲͖̟͎͎͈̗̜͖̖͈̜͉͎̠͉̦̣͙͍̻̱͓̘͚̠̰̱̭̠̗͔̲͚̤̬̳̹͓̥͉͔͎̯̦̊̿͐͑̊̒̎̋̀̂̿̆̾̃̿͗͛̑̇̅̾́͌̀̏̀̈́͊̈́̈́̈́́̓̓̆̅͋́̍͂̐͛͐̀̎̀̈̿̈͂̄̍̑̐̆͐͆̃̾͆͗̊̿͐̔̿́̅͂̒̈́͗͒̂̔̃͆̄̌̑̊̉͒͛͐͒͐̾̊̑́̅̋̈́̄̈̈́̒̀́̓̍̊̐́̇̈́̄̏̿̃̏̃̐̄̅͊̔̿͗̄̋͋̅̓̔̏̉͊́̓́̑̔̆̐̄͂̋͛̾̉̈́͆͊̾̍͂̆͑̃̅͌̿̍͆̑̒́̎̊̆̀̈̓͌̈́̌̄͐̾͌̚̕͘̚̚̚̕̚̚͘͘͘͜͝͝͝͠͠͝͝͠ͅͅr̸̢̢̧̡̨̢̡̧̡̧̢̛̛̬̭͖̹̟̗͎̻̳̦͍͖̝̯͖̜̮̬͖̣̬̪̲̠̜̼̖̣̰̮̤̤̲͖̹̹̦͍͈̩̱̳͖̖̱̳̥͉͙͚̬̞̭̬̯̻̜̣̫͎͕̱̠̦͔̣̣̟̩̺̖͕͚̗͚̼̣̱̜̣̟̯͉̦̝͉̝͙̠̩͎̞̼͙͆̾͋̆̔̋̊̈́̏͌̑̽̽͐̓̌͐̆̐́̉̀̉̀͌͋̋͗͋́̇̈́̀̋̾́̀̎̓̔̏͒̇̐̐̽͛͌̈̊͌̋̈́͗̍̍̆̂̉͛̕̕̕͘̕̕͘̚͘͜͠͝͠͠ͅͅͅͅą̶̡̢̧̨̡̨̨̡̡̡̨̢̧̡̨̢̧̢̨̧̛̤̜̪̖̻̘̲̝͚͔͖̝̠̰͇̰̭̞̭͓̘̯͔̻̺͕͕͙̥̙̜͓̞̳̠̫̭̫̮̼͎͕͎̣̤̙̺̟͇̤̱̘͙̣̝̘̖̳͔̭̞̝͖͔̟̖͇̺̣͓̠͇͉͚͓̝̜̗͔͍̬͇̲̣̰̼̤̞͕̮̭̻̟̖̜͇̼̜͓̯͔̜̥͍͖̞̜̰̲͖͓̠̩̣̦̗̣̳̻̜̜̻̖̞̰͇̩̟̫̟̼̽̌͌͆̄͗̐͂͋̽̈́͆̃̓͌́̄̋̅̽̇̓͋̽̓̈́̑̐͂̀̐̿̋͊̇̄͌̓̄͑̑͑̅̈́̂͛̇͂̏̒̏̌̃̒͋̿͋͛̆̏́́͘̕̚̚̕̕͜͝͝͝ͅͅḅ̴̢̨̝͇̳̣͍͚̹̟͈̯̠̽̒̈́͌̂͘ī̷̢̡̨̞̭͕͔͍̩̲̳̱̮͍̘̞̺͉̱̖̻̦͇̥͚̱̟̬̩̜͕̗͓̜̳͙̰͚͖̘̬̗̺̗̹̤̜̼̻̦̑̎̋͆̾̈̆͋͊̎͗̽̀̈́͒̓̉̐̍̀̑̈͂͊̋̂̅̓̈̽͐̇̀̀̈́̈́͂͊̀͘̚͜͝͠͝͝͝ͅļ̷̨̧̢̢̧̧̧̡̢̨̧̨̢̢̡̨̢̧̢̨̢̢̢̡̧̢̛̛̛̛̖͔̦͍͔̙͚̩̟͕͇̟̙̰̪̠͙͎̯͖̤͔̻͍̣͍̼̠̦̮͕͖̦͚̬̘̪͓̹̳̲̱̮̟̙͈͖͚̦̞̗̯̮̰͖̘͚̩͓̦̥̥̖͍̫̳̫͓̗̹̯̱͙̼͙̝̳̼̬̥͍̖̲̰̪̟͓͙͍̥̘̗͎͍̬͉̫̟͉̦̩͍͎͓̟͔̹̺̦̯̼͈̼͕͇͔͖̩̭͎͎̤̖͔̲͉̞̬͈̗̻̦͓͚̞͕͈͕̩̗̱͍̲̹͓̫̣̣̻̪͉̣͚̭̪̬̻̩̙̼̤͔͈̥̠̫̮̣̬̼̞̗͓̭͈̗͖͙̭̯̫͚̦̫̝̗̎̏́̀̒͋̈́̂̐̿̂̿͐́̈̅̋̉̃̍̏̔̑̆͐̐̓̋͊̽̽̄̔̿̇̐̔̉̎̉̂̾͑̂̀̍̃̇̔̉̎͂̅̃̈́̃̄̒͗͋͋̆̅͛̈̋̊͊̑̉̉͌̎̀͌̓͌̓̿̆̓̈́̐̾̎̓̅́́̅̀̌̓̊̌̓̈́̆͊̀͗̃̈͑̉̇̌̎̓̀̆̈́͆̇͑̋̀̌̓̈̋̌̅̅̒͛̎͛͒̈́̄͆̎̅͊̍̿͆͐̈́̉͆̒͐͂̏̀͒́̃̄͑̐̈͑͑̊͗̈́̓̓̋̀̚͘̕̕̚̚̕̚̚͘̕̚̚͘͜͜͜͜͜͜͜͜͜͜͜͝͠͝͝͝͝͝͝͠͠͝͠͝ͅͅͅͅͅî̷̛̠̪̻̜̣̗̱̫͎͙̙̜̳̘͚͖͉͚̮͕͙̮̺̗̮̩̯̜̘͙̭͙̫͓̦̪̹̀̆͗́͆͒͆̂̉̓̉̄͛͒̍̆̐̉̀̉̋͊̑̒̂̐̎̈́̏̽̀́̿̿̑̌͛͛͛̿͂̐̀͗͒̈́͌̀̉̾͋̒͆̃̔̔̇̕̕͘̚̚̕̚͘͝͠͠͝͠͝͝ͅͅď̷̡̨̢̡̧̢̢̨̨̡̨̨̨̨̡̢̧̡̢̛̛̛̛̛̛̜͇̪͍͈̝̩̼̪͉̫͔̫̦͈͓̘̥̖̤̫̮̞̘̱͙̘͎̘͇̩̗͕̺͓͍̱̠͍̩̳̺̥̦̹̗̤̣̝̪̙͇̗̰̖͓͉̭͕̠͓̬̝̭̝͓̯̲̼̩̮̖̥̭͚̩͚͕̝̲͚̜̜̗̺͙͇͉͇͙͉͉͖̼͚̲͔̣̦͎̱̬̙͕͍̯̘̮̲̱̹͖̭̰̘͉͉̬̟̳̠͎̬̼̭̘͇͉̗͙̠̝̮̣͓̳̪̣͕͙̳̭͚̺̳̦͇͔̰͌͛̽̄͋̈̈̃̊͊̒͌̔͐͌̾͋̓͐̈́̍̒̌̽̈́͊̅̈̎͑͛͂̇̇̾̂͂̅́̇̐̈́̏̀͑̄͗̋́̀͌̓̉́̑̽̍͒̂̈́̋̎̔̽͗̈́̏̾̌͊̓̓́́̅͋͆̀͌̊̈̊͗̾̾̐̌̾̍̌́̊̈͑̉̆͗̐̀̌̏̓̊̃̈̏̉̓̎͌̋̀͑́̿̃̃̀̈̓͆̍͛̋̿̿͆́̋͌̌̊̒̈́̆̌̋͗̒̈̀͐̈̇̍̾̈́̑̂̐̀̑͋̀̇̌̈́̍̀̀͊̇͒̔̿̓̄̽̓̒̈́̆̇̑͗̍̌͐̊͌̂͊͒̌͑̓͂́͛̓̀̌̅͛̍̌̐̕̕͘͘̚͘̚̚͘̕̕̚͘͘̕͜͜͜͜͜͜͠͝͝͠͠͝͝͝͠͝͝͝͝͝͝͝͝͝͝͝͠ͅͅͅͅͅͅá̵̢̧̢̨̛̛̛̛̛̛̛̛̛̛̪̲͙̫̩̯̙̙̜͍̝̭̮̳̱̲̦̙͎̭̩̮̥̬̰͈͚̭͓̹̲̦̲̻̪̱̫̜̩̫͖̮͚̖̗̠͔̱̻͚̗͎̟̹͕̟̹̀̇̾̾̂͊̽̊͌͐̈́̂̅̇́͒̀̆͗͌̓̃́̽͐̏͋͌͆͊̉̈́̉̀͌͊̀́̈̆̐̾̋͐̐̎̔̀̊͊́͆̅̔̑̉̅̽̆̐̄̂́̔̑̊̍̄̌͋́̀̀̆̈̒̍̑̐͑͂̇͗͊́͗̀̉̇͆̓́̈́̓̈́̓̊̔̀̄̇̅̀̉̒͛̊̓̑̓͂̌͒͛̑̆̈́͂̇͆̎͋̂̅̌̓̋̎͒̑͗̄͆͑͛̈́̉̆̀̊̌̆͂̏̏͛̄͊̉͐̒̒́̆̓̐͐͂̊̈́̾̉͌̒̆̂̈͊͆͐̃͊̑̋̒̾̇̆̏͑͆͂̄̽̚̚̕̕͘͘̚͘͘̚̕̕̚͜͝͝͝͝͠͠͠͝͝͝͠͝͝͝͝͝͠͠͝ͅḑ̵̢̢̡̨̨̨̨̡̢̛̜͎̠͍̥̰̯̯̼̝̼̗̪̦̱̮̬͔̬͖̩͖͖̲͈͔̠͍̫̥̭̣̳̤̯͈͉̜̜̹̬͓͖̹̮̟̺̖̫͎͉̻̼͙̱̬͉̦̖̪̻̥̲͔͇͔̭̗͇̣̺͉͎͎̣̗̙͖̝͚͇̺̱̳̣͙̜͉̥͓̯̬̺̠͖̦͔̤̪͉͉̯̹̻͚̦̲̦͕͕̫̳̮̓͂̆͜͜͜͜͜ͅͅͅ ̶̡̧̡̧̧̨̡̡̡̧̡̨̨̢̢̡̡̨̛̮̺̰̝̠͇͔̤͎̳͙̲͔̙̤̪͇̦͇̦̭̭̰͎̥̺̲̩̬̗͙̪̱͚̥̝̞̭̣̩̖̞̯̥̮͚͍̞̼͓͎͙̹̬͈̲̗̜̩͇̫̳̲͕̳̹̣̫̦̭͙͎̭͔̘͙̳̣̮͓͓̼̲̟͎͕̳̩̞̘̰̳̹̹͖̹̱͚̼̭̜̲̦͉͎͉̫͈̪̫̬̦̖̣̙̬̜̦̳̰̻͕͙̠̥͚̬̟̪̬̮̹͔̝̞͚͈͓͙̖̝̙̭̰̥̫̺͖̠̫͓̟̼̻̬͕̳̄̅́͑͂́͑͂̅́̊͑͗́́͆̄̏͌͒͆̈́̊̇͐̅́̊̂͆͑̍͑̋̉̎͒̇̎̌̈́̍̀̓̋̾̈̆̊́̅́̃̽̏̾̅͌͂͛̆̄̏̉̋͋́̉͗̈́̓̈́̍̀̒̀̀́͛̑̔̌̍̉̓̒̆̀̿̏̇̾̓̓̆͗̔̈́́̉̌̍̏̓̓̏̇̑͗̐͌̂̑̅̈́͂̎̈́̆̄̉̕̕͘̕̚͘̕͜͜͜͜͜͝͝͝͝͠͝͝͝͝͠͝͝͝͝͝͝ͅͅ",  },
      { name: "M̸̡̢̧̢̛͙̼̝̳͈̩̪̠̥͔̯̫̥͈̥͕̩͉̠͔̻̲̼̙̼̜̟͇͓̥͉̩͍̘̀̈́̊͌ó̵̧̫̗̖͇͍̼̘̳̮̪̫͓̯̖̭͉̘̳͕̜͔̣̲̲̬̞̘̹̖͙̠͉̙͉͍̱̼̞̪̩̦͈̻̹̙͓̇͋̽̀̎͑̌̐̊̚͘̕̚͜ͅd̵̡̡̡̛̛͇͈̭̣̞̼̗̜̲̤̰̗͓̫̳̖͖̺͇̰͓̺̘̰̜̘̖͍͚̟̘̖̯̠͙͔̝͉̓̏͂̈̋͒̑̊̓͋̋̀́̇̀̔̽̈́̇̆̊̒͗̌͋͊̀́̑̃̔̅͒̎̎̚̕͘͜͝͠ȕ̷̢̧̨̺̜͓̮͈̣̹̹͕̰̹̬̝̥͇̣̝͚̟͓̦̟͇̟͚̰̥̰̦̗̼͇̜̥͈̀͑̍̀̊͊̐͋́́̌̒̿͆͆̆̽̑̓͂̓̑͆͒͒̊̐̈́̄̒͊͌̿̒̓͑̉̆̏͛̍̓͛͒͊͂̈́͘͘͝͠͝͝͝ͅl̷̨̡̡̨̡̛͎̱͔̠̬͖̻̹̼̤͚͖̦̰͓̬͇̮̥̬̙̞͖͇̲̒̔͑̑͋̈́͑͗͑̀̀̈̅̑̄̌͊͋͐͌̊̃̑̊̀̐͋̑̌́̋͗͂̀̐̕͜͝͝ā̵̢̧̢̱̣͔̪̮̮̩̻̙̺̟̝͈͇̮̤͉̹̮͔̟̖̪͎͈̜̼̫̰͔̣̗͉̤̭̰̭͚̭̱̖̃̈́̀̈́͗͊͗͑̈́̒̐́̊̉̂̒̎̒͊͒̆́͋̑͛͗̆͑͂̓̑͋̓̀͛̃̓́̑̓̉͛͆̕͘͘̚͝͝͠ͅr̷̨̨̹̤̣̫̪̟͕̒̀̓̈̆̃̑̒̂̽̏̂̿̊͆̑̅̀̚͘͜͝i̷̦͙͎̱̜̭̠̝̗̦̖̮̽͋̎̈́͂̎̔̀̄̓̒̿̊̕̕d̶̢̢̢̧̢̛͎̱͖̘̙͇̹̦̺͎̗͎͇͇̞̥̝̠̭̦̮̗̊͗́̈́̄̑̊͊̾̽̈́͊̀̒̔͐̔̓̓̿͋̈́͆́̅̅̋̀̒͛̚͜͝͝͝ͅą̴̢̢̡̧̨̛̼̜͎͎̭̰̖̟̲̣̫̻̤̞̜͈̟̘̖͈̼̥͚͇̜̫̯̭̬̭̝̮̭͙͉̪͊̋͐̈̄͌̈́̓̂̓͊͛͛̎͂̈́̉͒̀͒̌̒̀̓̆̉̌͑̒̈̀̋̀̽̿͂̄̏̏̈́̒̉̔̾̍̕̚̕͜͠͠͠d̷̡̼̜̘͚̹̞̫̿̊̈́̈́̋͋̈̒̉̈́̈́̀̌̚̚̕͝ͅͅ ̶̡̨̧̧̡̧̢̨̛͎̱̞͕̪̲͓̙̪̪̜͖̪͇̥̣̱̰͉͎̤͇̫̳̬̣̗͈̬̥̞̹̲̠̟̹̀̅͆͋̅̊̑́̍̽̑́͆̒̐͆͆͜͠ͅ", },
      { name: "I̶̢̞̲̭̺͉͎̥̖̭̬̱̩̥̩̼͋̑̍̎͂̔͒̏̎͌̑̈͂͗̇́͂̅͋̐̓͒̄͒͆̈̈́̾̑͗̕̚͜͝͠͠n̸̺̲͖̩̳̹̱̦̤͙͔̥̱̣̩̩̟̬̋͋̂́͐̓̂͊͜ṯ̴̨̛͙̝̻̩̏͝e̸̡͙̦̥͖̹͎̱͍̘̯̭͈̽̾̔ͅr̵̡̨̡̡̛͔̪̟̱̰͍̟̺͈̫̩̳̪̼͙̯̫̻͕̻͚͕̭̮͎̘͙̤̞̼̈͊͛̊̃͌̉̈́̀͂͐̽̍͛͆́̆̑̽͐͂́͌̅̃́̾̒͆̎̓̕͜͝ͅo̴̧̨̠͔̘̩̘͙͇͎̪̗̥̪̲̒̒̎͒̈́̀̒͒̅̑͗̋̈́͐̅̚p̶̨̨̛̛̲͇̰̫̥̙͚̲͖̥̝̼͈̫͍̞͙͊̀͌́̐̌̊̎̓͋̈́̆̎͌̐̍̄͆̈́͘͜͜͝͠͝é̴̜̼̫̓̔͌̀̾͆̾͋̀́̔̀̉͑͑̆̆̑͊̒͝ṟ̴̯͚̊̆̐̔͂͌̈̑̎͑̐̄̏̐̆́̏̐̾́͊̉̃́̋͛̈́̓͐͆̉̕̚͠a̸̡̨̢̨̛̪̝̤͍͎̱̥̪̫̠̻̰̝̋̐́͋́̆̋͌͗́̾̆̈̃͆̈́̉͛̐́̉̏́̋̃̐̕͘͝͝͝͠b̵̛̛̛͙̦͖̽̓̐̍̌̇͂̈́́̊͐͑̌̎͑̑͐̀̉́͛̂̓̀̀̃͂͝͝į̵̡̨̨͔̟̫̟͍̲̮͙͖͇̤̺͍̗̙͖̪͓̥̮͙̥̏̑l̶̬̝̺̳̥͔̪̩̺̳̳͉̩͙̦̺̦̺͚͚̳͍̟͓͙̝͉̈̋̎̈́́̑͂̅͒̃̈̾̿̓̽̂̕͜͜͝ͅi̵̧̡̡͇̩͖̪̼̹̦̻̳̹̩̥͖̥̟̟̱͙̖͉̳̰͎̺̗̯͉̱̬̯̯̽̑̽̊̏̀̂̓̀͛̉̀͘͝͝d̸͔̩͉̫̆̄̓͗̾͆͊͒͊̆́̆̑̃̎͊̕͝á̸̛̩̉̈́͋͠d̴̨̨̢̨̛͙̼͕̩̰̼̞͙̫͉̝̤̭͕̜͍͙̦̠͎͉͓̺̍̋̈́̈́͒̿̌̈́̈̊̈́̌̔̿̏̋͛̀̾̊̾͊͗͝͠",},
      { name: "ḑ̵̨̨̨̡̧̡̢̡̧̢̢̡̡̡̢̢̨͙̝̘͚͈̼͈͎̫͚̣̬̦̺͚̝̞̰̣̮͉̟̖͉͙̗̖͍̜̠̦̙͈̞̱̬̭͚̩̪̳͔̫̩̮̠̻̭̩͙͚̜̤͚̪̦̲͙̲̬̱͖̠̤̙͔͙͎̼͎̱͔̬͕̯͚̥̝̬̯̯͉̼̟͇͇̥̬͙͚͖͙̳͖͈̰͉͙̯̥̩̠̙̞͉͔̼͇̥̫̺͍̙̙̣̥̹̟͉̘͚͙̲̬̦̟̻̮̞͔̣̟͖̝̪͔̺̖͖̯̗͓͔̠͇̼̗̩̲͔̩̱̳̦̤̤̫̩͖̺̩̹̥̹̞̟͉͇̫̭̪̬̬̦̳̤̣̦̮̙̩̟̻͈̟̀͐̉͘͜͜͜͜͜͜͜͠͝ͅͅͅͅͅŕ̷̢̡̧̢̨̧̢̢̢̢̢̡̧̢̡̧̛̛̛̛̛̠͕̣̟̗̘͙̘̦̼͎̺̭̦̭̼͉͓̠̫̘̬̙̱̺̮̥͉̲̱͇̲̳͓̹̠͇̯̻͈̱̻͕̙͔͔̳̞͙̻͚͖͉̦͇̤͕͈̦̤̟̭̺̭̦̱̝͔̳̟̤̙͖̰͔̙̬͓̮̙̹͇͓̹̱̝͍͖̘̺̮̟̫̻͓̯̲͍̱͔͔̗̪̤͖̜̣̠̗̺̤̟͈̬̬̟̥̭̥̺̜̗͔̜̳͔͙͔̯̝͚̤̞̯̫̤͙̈͒͒͒͐̐͋̋͊͋͐͑̓̈́̌͒͗̌̐̍͒̾̉̓̇́͂̈́̄̇̊̔̽̍́͆͐͋̐̈́͑̈͒̍̓͌́͛̾͊̅̓̄͊̐͊̉̆̀͑̇́̊͒͗̍͋̿̈͛̈̃͗̌̄̎̅̓͗̅̇̀͆̑͒͆͊̄́͛͊̒͊̿͗̊̎̈́̔̍̒̈́̉̉̔̐̔͒̎̈́́̈́̓̽̽̓͂̎̅̄̍̇̀̔̐̾̍̎͆̽̄̉͐̍̐̓̒̐̑̀̽̎̓̄̽͒̔̇́̿̈́̂͐̒̀̕̚͘̕͘̚̚̚̚͜͜͜͝͝͝͝͝͠͝͠͠͝͝͝ͅͅơ̸̡̧̨̡̧̡̨̢̨̛̛̛̻̻̯̬̰͔̭͎̤̣͎͎̗̰͍̟͚̣͎͎̱͉͖̭̥͇̰̙̞͇̱̳̦̱͈̦͓͍̺̪̥̠̖̰͙̗͙̪̼̳͈̻̝̙̟̲͓̼̱̠͇̭̫͇̯͚̗̭̻̼̞̺̦̗͓̳̦͍̘͓͍͔̗͇̱͔̣͓̠̙͔̥̩̺͈͕̣̘͈̥̱͔̝̬͙̼͚͖̫̈́̌͌̈́̍͊͐̍̿̎̓̒̀͌͊̄̇̅̌̂͂̄͆͂͒̍͐̅͆̋̐̊͂̂́͌͌̀̈́̅̓͛̇̒̀͒̿̈̐̿̓̒̈̉͊̀̏̈͒̾̂̋͛́̾͗̓́͋̑͒͆͆͆̉̇̏̍̐̒͊͋̑͆̉͊͆̉̐̂̋̄̈́̌̿͒̎̈́̑͊͌͂̒̈́͐̕͘͘͘͘͘̕̕͜͜͜͜͝͠͠ͅͅņ̷̢̡̨̢̢̨̡̡̧̛̛̛̛̛̪̬͉̹̘̻̞̘̤̱̻̙̹̯̺̯̪̱̫̘̘͇̬̱̘̼̪͎̠͙̫̜̦͇̺̰̯̠̣̠̗͔̘̣̦͎̼͉̥͙̥̦̭͎̫̱̻̼͎͕̙̟̳̩̣͉̭̜̥̬̥̺̥̹͎̖̰̪̻̤͍͍̳̩̭̩̜̯͕̠̲̪̫̫̟̟̩̯̳̬̝̬͇͕̞̗̞͕̜͈͈͔͖͎̫͔̱̰̥͇̠̭̲̦͕͖̗͙̖̀̉̀̔̆͊̆̒̓̍̾͐̊́̌̉͊̅̉̔͊̑̈́̉̏̈́̈́̆̈́̈́̆̌̌͛͗̈́̃͐̎̋̅͒̊̽͐̉́̿͒̈́͗͐͒̏͋̐̄̓̀́͛͂͆̾̎̾̆̏͌̾̾̃̓̄̈́̿̉̈̒̿̄̓̆͑̂̓̀̀̾̑͐͌́̈́͊̊̉̓̾̓̌̊̔̃̍͊̈́̿̌͂̆̽̒̈́͂̅́̾̈́̃̎̓̐̀͊͑͋͋̔͒̌̓͆̈́͋̐̄̓̆͂̀̍̉͗̆́́̈́̆̕̕̚̚͘̚͘͘͘̚̚̕̕͘͜͜͜͜͝͝͠͠͝͝͝͠͠ͅͅͅę̴̧̡̢̡̨̨̢̨̢̨̢̨̢̨̡̧̨̨̡̛̛̛̛̛̟͍͙̭̣̞̹̖͖̝͕͔͍̟͖̘̠̙̲̺̹͇͚̠̠̝̬̜̲̘̺̯͎̬͓͈̩̟̘͖͓̲̺͈̪̝͕͓͖̠͚̣͕̼͎̲̯̗͚̻̗̲̣̼͕͇̳͙͙͉̜̝̣̝͖͉͈̮̬̰̘̝̮͙̳̥͎͎̤̙̗̤͍̬̬̯̙̜͙̹͖̭̰̥̜̰̯̖̼̦̜͓̜͍̫̖̭͓̳̟̬̹͈͖̙͓͉̦̯͕͇͕̘̼̩̜̘̘͉̙͔̦͇̫͓̗̩̺̯͇͕̤̫͈̲͙̖̪̪̼̹̫͉̭̬̬͚̙͉̮͈̠̦͙̬̱̟̻̞̹͎̝̤̝͎̙̜̭͛̎̓̓̀͛͐̌̇̽̂͂͗̌̍͛̋̀̔̇͊̽̂͂̏͊͒̐̌͐̀̈́̐̆̿̽̃͐́̈̌̈́̀́͑̃̾͊̏̈́̍̾̓̄͊͛̔̿́̇͐͌͌͛̔͗̐̈́͌̔͌͆̄̑̅̆̍́̌̽̓͆̌̓̄̌͆̋̎̊̃͊͊̐̈́͊̈́̌͗̇̍̈́̐̔̉̉̈́̀̑̇͐̀̃̐̇̈́̊̓͐̃͛̐͊̂̌̅̓̌͐́̒͂̃̈̅̑̉̉̋͛̍͒̓̈́̍͆̋̋̒̈́̏͋̌͂͋̔̄͋̐̀̃̓̓̇̽̽̽͌̊̎͑͒̌͂̈͋́̉̍͗̓̔̽̉̑̿͆́̆̃̇̓̅̕̚̕̕̕̚̚̕͘̚̕̕͜͜͜͜͜͝͠͠͝͠͝͠͝͝͝͝͝ͅs̴̡̥̞̤̗͖̙̟̭̺͔̬̺̙̖̉̉́̽͛͊͊́̿̔͗̐̀̽͐̀͑̽̍͌́̾͗̂̊͆́͂̚̚͠", description: "En el valle del fin del mundo, mientras los ejércitos del reino de los cielos y los demonios se preparaban para la batalla, el gigante el rey desafió a los del reino de los cielos a un combate singular durante cuarenta días, infundiendo un gran temor en Lucifer y sus hombres. El loco, un joven pastor enviado por su padre, san miguel, para llevar provisiones a sus hermanos en el frente, escuchó el desafío y, ofendido por la afrenta a Dios, se ofreció a luchar. Rechazando la armadura de Lucifer por serle desconocida, el loco se enfrentó al gigante armado únicamente con su dron, su M16 con red dot y cinco granadas EMP. A pesar de las burlas de el rey, el loco, confiando en el poder de Dios, le disparó con su M16 y la bala se incrustó en la frente del gigante, derribándolo. Acto seguido, corrió hacia él, tomó la propia espada de el rey y lo mató cortándole la cabeza. Al ver a su campeón derrotado, los demonios huyeron, y el ejército del reino de los cielos los persiguió, logrando una victoria decisiva." }
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
      })
      .on("click", function (event, d) {
        // Trigger flash animation on click
        handlePointClick(d);
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
      {/* Flash Overlay */}
      {showFlash && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10001,
          pointerEvents: 'none',
          animation: 'flashFade 1s ease-in-out'
        }}>
          <div style={{
            fontSize: '20rem',
            color: '#ffffff',
            textAlign: 'center',
            whiteSpace: 'pre-line',
            fontFamily: "'Doto', sans-serif",
            fontWeight: 'bold',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4)',
            animation: 'flashPulse 1s ease-in-out'
          }}>
            {flashText}
          </div>
        </div>
      )}

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
          color: "white",
          fontSize: "2.2rem",
          fontFamily: "'HornetDisplay', sans-serif",
          fontWeight: "400",
          border: "1px solid black", // White border
          padding: "10px 20px",
          borderRadius: "0px",
          pointerEvents: "none", // Ensure the textbox doesn't interfere with hover
          background: "black", // No background
          width: "auto",
          maxWidth: '500px'
        }}
      >
        {displayedText}
      </div>

      {/* Hexagon SVG */}
      <svg ref={svgRef} width={width} height={height} style={{ display: "block", margin: "auto" , height: '150vh'}} />
      
      {/* CSS animations */}
      <style jsx>{`
        @keyframes flashFade {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }
        
        @keyframes flashPulse {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Hexagon;
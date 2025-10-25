import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { loadImageShape } from "tsparticles-shape-image";

export default function PokemonParticles() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
    await loadImageShape(engine); // Load image shapes
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#000", // Dark mode background
        },
        particles: {
          number: {
            value: 80, // Total particles
          },
          color: {
            value: ["#FFDE00", "#FF0000", "#3B4CCA"], // Pikachu (yellow), Pokéball (red), Squirtle (blue)
          },
          shape: {
            type: ["circle", "image"], // Circle + Image particles
            image: [
              {
                src: "/pokeball.png", // Floating Poké Ball
                width: 40,
                height: 40,
              },
            ],
          },
          opacity: {
            value: 0.9,
          },
          size: {
            value: { min: 3, max: 8 }, // Random sizes
          },
          move: {
            enable: true,
            speed: 2,
            direction: "top",
            random: true,
            outModes: "out",
          },
          line_linked: {
            enable: false, // Disable normal linking
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "trail",
            },
          },
          modes: {
            trail: {
              delay: 0.1,
              quantity: 5,
              particles: {
                color: { value: "#FFD700" }, // Lightning color
                opacity: { value: 0.9 },
                size: { value: 5 },
                move: { speed: 10 },
              },
            },
          },
        },
      }}
    />
  );
}

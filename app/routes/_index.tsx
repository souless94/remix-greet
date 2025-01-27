import { useActionData, Form, MetaFunction } from "@remix-run/react";
import { createCanvas } from "canvas";
import type { ActionFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix CNY Greet" },
    { name: "description", content: "Generate personalized Chinese New Year greetings" },
  ];
};


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = (formData.get("name") as string) || "Friend";

  // Canvas dimensions
  const width = 800;
  const height = 400;

  // Create canvas and draw
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Add rounded corners to the canvas (Clip the content inside)
  const cornerRadius = 20; // Adjust this value for more or less rounded corners
  context.beginPath();
  context.moveTo(cornerRadius, 0);
  context.lineTo(width - cornerRadius, 0);
  context.quadraticCurveTo(width, 0, width, cornerRadius);
  context.lineTo(width, height - cornerRadius);
  context.quadraticCurveTo(width, height, width - cornerRadius, height);
  context.lineTo(cornerRadius, height);
  context.quadraticCurveTo(0, height, 0, height - cornerRadius);
  context.lineTo(0, cornerRadius);
  context.quadraticCurveTo(0, 0, cornerRadius, 0);
  context.closePath();
  context.clip(); // Clip the canvas to have rounded corners

  // Background color: Lighter gradient for a festive feel
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#FF7F50"); // Lighter coral color
  gradient.addColorStop(0.4, "#FFE4FA"); // pale purple
  gradient.addColorStop(0.7, "#EEE5E9"); //lavender brush
  gradient.addColorStop(1, "#FFD700"); // Gold color
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height); // Fill the canvas with the gradient

  // Greeting text with black color and Montserrat font (no shadow)
  context.fillStyle = "#000000"; // Black color for text
  context.font = "50px 'Montserrat', sans-serif"; // Montserrat font for modern look
  context.textAlign = "center"; // Center the text horizontally
  context.textBaseline = "middle"; // Vertically center text
  context.fillText("Happy Chinese New Year!", width / 2, height / 2 - 40);
  context.fillText(`${name}!`, width / 2, height / 2 + 40);

  // Decorative emojis with a more dynamic position
  context.font = "30px 'Montserrat', sans-serif";
  context.fillText("🏮🎉🐇🧧🏮", width / 2, height - 60);


  // Convert canvas to Base64 PNG
  const base64Image = canvas.toDataURL("image/png");

  return { base64Image };
};

export default function Index() {
  const actionData = useActionData<{ base64Image?: string }>();

  return (
    <div className="flex flex-col items-center p-8 ">
      <h1 className="text-2xl font-bold mb-4 font-serif mt-5">Create Your Chinese New Year Greeting</h1>
      <Form method="post" className="mb-6 mt-5">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          pattern="[A-Za-z ]+"
          title="Only letters and spaces are allowed"
          className="border-2 border-black rounded-lg p-2 mb-2 font-serif mr-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-transparent text-orange-500 border-2 border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white focus:outline-none font-serif"
        >
          Generate Greeting
        </button>
      </Form>

      {actionData?.base64Image && (
        <div>
          <h2 className="text-xl font-bold mb-2 font-serif">Your Greeting</h2>
          <img
            src={actionData.base64Image}
            alt="Generated Chinese New Year Greeting"
            className="rounded mt-5"
          />
        </div>
      )}
    </div>
  );
}

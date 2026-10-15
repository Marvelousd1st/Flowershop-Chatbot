# Flower Shop Chatbot — IBM watsonx Assistant Portfolio Demo

This repository contains a responsive flower shop website and a standalone demonstration of the conversation flows from an exported IBM watsonx Assistant action skill.

## Original IBM action features represented

The exported file `flower-shop-chatbot-action-v1 (1).json` contains 10 actions and 7 intents. The demo reflects these features:

- Florence, the flower shop virtual assistant greeting
- Store location information for Vancouver, Lagos, Abuja, Port Harcourt, and the United States
- Store opening hours
- Flower recommendations for anniversary, birthday, Christmas, get-well, graduation, Mother's Day, new baby, romance, thank-you, Valentine's Day, wedding, and just-because occasions
- Thank-you and goodbye responses
- A fallback response for unsupported questions

## Run locally

Open `index.html` in a web browser. No build tools or server are required.

## Publish on GitHub Pages

1. Create a GitHub repository.
2. Upload `index.html`, `styles.css`, `script.js`, and `README.md` to the repository root.
3. Go to **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/(root)`, then save.
5. Wait for GitHub Pages to display the published URL.

## Important technical note

This is a static recreation of selected conversation flows based on the exported action JSON. It is **not connected to a live IBM watsonx Assistant runtime** and cannot provide IBM's NLU, state management, or live-agent handoff. For a live connection, the IBM assistant must still be available and a backend must handle authentication securely. Never put an IBM API key or service credential in browser JavaScript or a public GitHub repository.

## Original JSON backup

Keep your original JSON unchanged as a backup. Before making it public, inspect it for private information, service credentials, or details you do not want to publish. If you include it in the repository, you can place it in an `ibm-assistant/` folder.

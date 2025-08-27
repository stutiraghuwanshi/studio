#stocksInsight


# Stock Insights - AI-Powered Financial Analysis

![Stock Insights Dashboard](https://placehold.co/800x400/282c34/ffffff?text=Your+Dashboard+Screenshot+Here)
<p align="center"><i>A modern web application that provides AI-driven stock predictions, news summaries, and personalized user experiences.</i></p>

---

## ✨ Key Features

- **Secure User Authentication**: A custom login page requires a username, date of birth, gender, and a numeric security PIN to access the dashboard.
- **AI-Powered Stock Predictions**: Select a stock and get AI-generated price predictions for different timeframes (1M, 6M, 1Y).
- **AI News Summarization**: The application fetches relevant news articles for a selected stock and uses an AI agent to provide a concise summary.
- **Dynamic Price Analysis Chart**: A beautiful, interactive chart displays historical stock data alongside AI-predicted prices, with a vibrant neon color scheme.
- **Personalized Avatars**: Upon login, the app generates a unique cartoon-style avatar based on the user's selected gender using an AI image generation model.
- **Key Financial Metrics**: A dedicated card displays crucial, up-to-date information like the current stock price.
- **Light & Dark Mode**: Easily toggle between a light or dark theme to suit your preference. The entire UI is themed for both modes.
- **Responsive Design**: The application is fully responsive and works seamlessly on both desktop and mobile devices.

<img width="953" height="443" alt="stock1" src="https://github.com/user-attachments/assets/7a66cd2d-2cc2-490d-ab4e-c865cf7760a3" />
![WhatsApp Image 2025-08-27 at 12 39 11_e77aaacf](https://github.com/user-attachments/assets/d82ac548-5590-475d-94d8-bac2572a3712)
![mainpage](https://github.com/user-attachments/assets/168cde1e-b098-48c0-9fad-61c94de41780)








## 🛠️ Tech Stack

This project is built with a modern, AI-first technology stack:

- **Frontend**: **Next.js** (App Router), **React**, **TypeScript**
- **Styling**: **Tailwind CSS** for utility-first styling and **ShadCN/UI** for the component library.
- **AI/ML**:
  - **Genkit**: An open-source framework from Google to build, deploy, and monitor AI-powered features.
  - **Google Gemini Models**: Leveraged for both advanced language tasks (prediction, summarization) and image generation.
- **Charting**: **Recharts** for creating beautiful and interactive charts.
- **State Management**: React Hooks (`useState`, `useEffect`).

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Google AI API key.
    ```env
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

### Running the Application

1.  **Start the development server:**
    This command runs the Next.js application.
    ```sh
    npm run dev
    ```

2.  **Start the Genkit development server (in a separate terminal):**
    This command runs the AI flows and makes them available to the application.
    ```sh
    npm run genkit:watch
    ```

3.  **Open your browser:**
    Navigate to [http://localhost:9002](http://localhost:9002) to see the application in action.

### Login Credentials

Use the following hardcoded credentials to log in:
- **Username**: `stutiraghuwanshi`
- **Date of Birth**: `2004-10-15`
- **Security Pin**: `1510`
- **Gender**: Select any option.


#stocksInsight


# Stock Insights - AI-Powered Financial Analysis

<img width="943" height="392" alt="image" src="https://github.com/user-attachments/assets/329182f2-6505-4fd8-9fa7-3b56ae9981a2" />
)
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
<img width="953" height="443" alt="stock1" src="(https://github.com/user-attachments/assets/21c1b503-21b2-4399-97be-0614f9e89b0a)" />
<img width="959" height="454" alt="image" src="https://github.com/user-attachments/assets/10546635-c114-4c6a-8b5e-0bca7ca6186d" />











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


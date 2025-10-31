# DevConnect - The Developer Profile Directory

DevConnect is a full-stack web application designed as a Developer Profile Directory. It allows developers to create and showcase their professional profiles, 
making it easy for others to view, discover, and search for talent based on name or specific skills.

## Features

1.  **Add Developer Profile:** Users can submit a profile using a simple form that captures their:
      * **Name**
      * **Bio**
      * **Skills** (stored as an array of strings)
      * **GitHub** and **LinkedIn** public links
2.  **View All Profiles:** Fetches and displays a directory of all registered developers. Each profile is presented in a card format, showing essential information (name, bio, skills, and links).
3.  **Search & Filtering:** Allows users to quickly find profiles by **name** or **skill**, enabling targeted talent discovery.

## Tech Stack

| Layer | Technology | Key Libraries/Notes |
| :--- | :--- | :--- |
| **Frontend** (`client/`) | **React + Next.js + TypeScript** | Framework for the UI, leveraging TypeScript for robust, type-safe code. |
| **Backend** (`server/`) | **Express.js (Node.js)** | Minimalist framework for building the REST API. |
| **Database** | **MongoDB** | NoSQL database for flexible data storage. |
| **ORM/ODM** | **Mongoose** | Used to model application data and interact with MongoDB. |
| **Styling** | **Tailwind CSS** | (Specify which one you chose) for a clean, maintainable, and responsive UI. |

-----

## To Run The Project

### Prerequisites

Following software must have installed:

  * **Node.js**
  * **npm** 
  * **MongoDB** running locally or a cloud connection string (e.g., MongoDB Atlas).

### Clone the Repository

```bash
git clone https://github.com/Kethnulee-Weerasinghe4/DevConnect.git
cd DevConnect
```

### Server Setup

Navigate to the server folder:
    ```bash
    cd server
    ```
Install dependencies:

    ```bash
    npm install 
    ```
    The API will run on http://localhost:5000.

### Client Setup

Navigate to the client folder:

    ```bash
    cd ../client
    ```
Install dependencies:

    ```bash
    npm install 
    ```
    
    The application will open at http://localhost:3000.

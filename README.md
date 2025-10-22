# DevConnect – Developer Profile Directory

DevConnect is a full-stack web application designed to serve as a directory for developers. Users can create a profile, view profiles of other members, and efficiently search the directory by name or technical skills.

## Features

DevConnect implements the following core functionalities:

* **Profile Creation (POST)**: A modern, responsive form allows users to submit their name, bio, skills (comma-separated), GitHub, and LinkedIn links.
* **Dynamic Profile Viewing (GET)**: All profiles are fetched from the database and displayed on the homepage using clean profile cards.
* **Live Search/Filtering**: Profiles are filtered instantly by name or any listed skill using dynamic API calls, providing a fast and efficient search experience.

***

## Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend** | **Next.js, React, TypeScript** | Client-side logic for search, forms, and UI rendering. |
| **Backend** | **Express.js (Node.js)** | RESTful API routes for data interaction. |
| **Database** | **MongoDB (Mongoose)** | Flexible NoSQL database for storing developer profile data. |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework for rapid and responsive styling. |

***

##  Setup and Installation

To run this project locally, need to set up both the backend API server and the frontend Next.js application.

### Prerequisites

* Node.js (LTS version) and npm installed.
* A running **MongoDB** instance (local or a cloud service like MongoDB Atlas).

### Step 1: Clone the Repository

Clone the project from GitHub and navigate into the main directory:

```bash
git clone [https://github.com/YOUR_USERNAME/devconnect.git](https://github.com/YOUR_USERNAME/devconnect.git)
cd devconnect

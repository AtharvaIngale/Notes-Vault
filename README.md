<h1 align='center'> Notes Vault </h1>

<h4 align='center'>Notes Vault is a comprehensive note-taking application that allows users to create, manage, and share text and voice-to-text notes.
  It leverages modern web technologies and integrates with external services for enhanced functionality.</h4>
<hr>
<br />

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [API Reference](#api-reference)
6. 🔗 [Author](#author)

<br />

## <a name="introduction">🤖 Introduction</a>

Notes Vault is a versatile note-taking application designed to streamline information management. Whether you're capturing ideas, meeting minutes, or voice memos, Notes Vault offers a robust platform to store, organize, and share your notes efficiently.
<br />
With features including text and voice-to-text note creation, PDF export, and seamless sharing, Notes Vault caters to a wide range of users. Built on a solid foundation of React JS for the frontend and Spring Boot for the backend, the application delivers a user-friendly experience while ensuring data security through MySQL database storage

<br />

## <a name="tech-stack">⚙️ Tech Stack</a>

#### Frontend
* **React JS:** A JavaScript library for building user interfaces, providing a component-based architecture for efficient development and maintainability.

#### Backend
* **Spring Boot:** A Java-based framework that simplifies the development of RESTful APIs, enabling rapid backend development and deployment.
* **MySQL:** A relational database system for securely storing user data, including notes, metadata, and user information.

#### Additional Tools and Services
* **AssemblyAI API:** For accurate and efficient transcription of voice notes to text.
* **iTextPdf:** To generate PDF documents from note content for easy sharing and archiving.
* **Web Share API:** To facilitate seamless sharing of notes across different platforms.

<br />

## <a name="features">🔋 Features</a>

👉 **Text Note Creation and Editing:** Users can create and modify text-based notes.<br />
👉 **Voice-to-Text Conversion:** Users can record audio notes and convert them to text using AssemblyAI API.<br />
👉 **PDF Export:** Notes can be exported as PDF documents for easy sharing and archiving.<br />
👉 **Note Sharing:** Users can share notes with others using the Web Share API.<br />
👉 **Secure Storage:** Notes are stored securely in a MySQL database.<br />
👉 **User-Friendly Interface:** Built with React JS for an intuitive user experience.<br />
👉 **RESTful API:** Provides endpoints for CRUD operations on notes.

<br />

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Apache Maven](https://maven.apache.org/index.html) or [Eclipse IDE](https://eclipseide.org/)

**Cloning the Repository**

```bash
git clone https://github.com/AtharvaIngale/Notes-Vault.git
```

**Backend Installation**

Navigate to the backend directory:
```bash
cd Notes-Vault/Backend
```

Install dependencies:
```bash
mvn clean install
```

Start the Spring Boot application:
```bash
java -jar target/notes-vault-backend.jar
```

<b align="center">OR</b>
Run the **NoteVaultApplication.java** file in Eclipse IDE.

**Frontend Installation**

Navigate to the frontend directory:
```bash
cd Notes-Vault/Frontend
```

Install the project dependencies using npm:
```bash
npm install
```

Running the Project:
```bash
npm start
```

Open http://localhost:3000 in your browser to view the project.

<br />

## <a name="api-reference">🕸️ API Reference </a>

#### 1. API Description for User related action:
| METHOD | PATH     | DESCRIPTION                |
| :-------- | :------- | :------------------------- |
| `POST` | `/users` |  new user registration |
| `PUT` | `/users` |  update user |
| `GET` | `/users/{id}` | find and view user |
| `DELETE` | `/users/{id}` |  delete user |
| `POST` | `/users/verifyByphone` |  user login |
| `GET` | `/users/{id}` |  all users |

#### 2. API Description for Notes related action:
| METHOD | PATH     | DESCRIPTION                |
| :-------- | :------- | :------------------------- |
| `POST` | `/notes/{user_id}` |  add new note |
| `PUT` | `/notes/{user_id}` |  update note |
| `GET` | `/notes/{id}` | find and view note |
| `DELETE` | `/notes/{id}` |  delete note |
| `GET` | `/notes/byUser-ID/{user_id}` |  all notes |
| `GET` | `/notes/download/{id}/pdf` | convert notes to pdf |

<br />

### <a name="author">🔗 Author </a>
[Atharva Ingale](https://github.com/AtharvaIngale)


<br /><br /><br />

<hr>
<i>The project is still in progress to add more features</i>


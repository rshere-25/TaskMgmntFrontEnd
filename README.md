# TaskMgmntFrontEnd

## Overview
TaskMgmntFrontEnd is a **React 18** based frontend for the TaskMgmntApp, providing a user-friendly interface for managing tasks efficiently.

## 🛠 Technology Stack
- **React 18**
- **Material-UI (MUI) for UI Components**
- **Node.js 22.14.0**

![TaskMgmntApp](https://github.com/user-attachments/assets/28c8b126-5ce7-416e-b8d4-b41f9be9539a)

---

## 🚀 Getting Started
### Prerequisites
Make sure you have the following installed:
- **Node.js v22.14.0** (or later)
- **npm** (comes with Node.js)
- **VS Code (Recommended)**

### 📌 Installation & Setup
1. **Backend Setup:**
   - Clone the backend repository:  
     ```bash
     git clone https://github.com/rshere-25/TaskMgmntApp.git
     ```
   - Follow the backend setup instructions in its `README.md` file and launch it.

2. **Frontend Setup:**
   - Clone this repository:  
     ```bash
     git clone https://github.com/your-username/TaskMgmntFrontEnd.git
     ```
   - Navigate to the project folder:
     ```bash
     cd TaskMgmntFrontEnd
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

---

## 📷 Screenshots & Workflow
### 1️⃣ **Login Page**
After starting the application, you will see the **Login Page**. First, create a new user.

![Login Page](https://github.com/user-attachments/assets/414e03fe-327d-4695-bd7f-e722e4727c21)

### 2️⃣ **User Registration**
Once a user is created, you will be redirected to the login page.

![User Registration](https://github.com/user-attachments/assets/09f44103-c6ef-45a8-be93-faddbb1f2743)

### 3️⃣ **TaskBoard**
Upon successful login, users are taken to the **Task Board**, where all tasks are displayed similar to **JIRA**.

![Task Board](https://github.com/user-attachments/assets/e36381be-15b7-4519-bc05-6384b62c9823)

### 4️⃣ **Adding a Task**
To create a new task:
- Click on **"Add Task"**.
- Fill in the required details.
- Click **"Submit"**.

![Add Task](https://github.com/user-attachments/assets/7116e4ab-3071-476a-aa52-85fb0ceae984)

Once submitted, the task appears in the **Task Board**, with favorite tasks marked using a filled star icon.

![Favorite Task](https://github.com/user-attachments/assets/3d199821-efa1-4943-ac3e-0bf3008453ed)

### 5️⃣ **Updating a Task**
- Click on the **task name** to open the update window.
- Modify any fields (e.g., status change to **In Progress**).
- The task will automatically move to the corresponding column.

![Update Task](https://github.com/user-attachments/assets/d3bab616-8a30-40dc-99c8-e829d2ddc35a)

![Task In Progress](https://github.com/user-attachments/assets/c5ab097c-c530-430b-bc44-0acb2d119256)

### 6️⃣ **Deleting a Task**
- Click the **delete button** next to a task to remove it.
- Confirm the deletion in the popup.

![Delete Task](https://github.com/user-attachments/assets/6fdc48de-f2f3-4bf3-a7a8-21bfa52ad348)

---

## 🔮 Future Enhancements
- 🏗 **Drag-and-drop support for moving tasks**
- 🖼 **Image attachment & viewer integration**
- 👨‍💼 **Admin panel for managing task fields dynamically**
- 📌 **Subtasks feature**
- 📂 **Task categorization support**

---

## ❗ Troubleshooting & Guidelines
### ❌ Common Errors & Fixes
#### ⚠️ **Error: npm is not digitally signed**
If you encounter an error like:
```bash
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded. The file is not digitally signed.
```
Run the following command in **PowerShell**:
```powershell
Set-ExecutionPolicy Unrestricted -Scope Process -Force
```
Then, try running:
```bash
npm start
```

---

## 📝 License
This project is licensed under the **MIT License**.

---

### 🚀 **Happy Coding!** 🎯




# TaskMgmntFrontEnd
React based front end logic for TaskMgmntApp

# Technology details
React 18,
Mui Materials design
nodejs 22.14.0

![image](https://github.com/user-attachments/assets/28c8b126-5ce7-416e-b8d4-b41f9be9539a)

# Instructions
1. To run the program locally, Download first "https://github.com/rshere-25/TaskMgmntApp" code base and launch it in browser.
2. Then download this repo and open the "task-management-app" in VSCode.
3. Make sure you have the required software installed or install using "**npm install**" command.
4. Then in the terminal run "npm start" command. (See Guidelines section if you face any errors.)
5. This will open the Login page. First create a new user, then login.
   ![image](https://github.com/user-attachments/assets/414e03fe-327d-4695-bd7f-e722e4727c21)

  ![image](https://github.com/user-attachments/assets/a3cbba44-02f7-4750-9827-574ce81016ac)
  
6. After successful user creation, it will navigate to Login page.
  ![image](https://github.com/user-attachments/assets/09f44103-c6ef-45a8-be93-faddbb1f2743)
7. Then Login with newly created user. Once the login is successful it will take to TaskBoard page.
  ![image](https://github.com/user-attachments/assets/e36381be-15b7-4519-bc05-6384b62c9823)
8. As similar to Jira, it loads all users tasks in the task board.
9. Create a new task by clicking "Add Task" button.
10. After filling the inputs, click on submit button.
  ![image](https://github.com/user-attachments/assets/7116e4ab-3071-476a-aa52-85fb0ceae984)

11. This will create a new task in TaskBoard. Favorite tasks are higlighted with filled star icon.
  ![image](https://github.com/user-attachments/assets/3d199821-efa1-4943-ac3e-0bf3008453ed)

12. To update the Task Click on the Name of the Task, this will open Update window.
    ![image](https://github.com/user-attachments/assets/d3bab616-8a30-40dc-99c8-e829d2ddc35a)

13. Update any field, here I updated status to in Progress. After Updating it the task should be moved to In Progress Column.
   ![image](https://github.com/user-attachments/assets/c5ab097c-c530-430b-bc44-0acb2d119256)
14. Next delete the created task.
   ![image](https://github.com/user-attachments/assets/6fdc48de-f2f3-4bf3-a7a8-21bfa52ad348)

# Future enhnacements
Add Move task logic.
Add image viewer.
Add admin logic, where he can create the Taskboard columns, Task fields dynamically.
Create Subtasks.
Add categories.

# Guidelines
1. If you fave an error like "npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded. The file C:\Program Files\nodejs\npm.ps1 is not digitally signed." while running "npm start", then run the bewlo command "**Set-ExecutionPolicy Unrestricted -Scope Process -Force**".
2. Then run again "npm start".


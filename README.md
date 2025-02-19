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

14. 
15. 
16. 


# Future enhnacements
Add Move task logic.
Add image viewer.
Create Subtasks.
Add categories.

# Guidelines
1. If you fave an error like "npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded. The file C:\Program Files\nodejs\npm.ps1 is not digitally signed." while running "npm start", then run the bewlo command "**Set-ExecutionPolicy Unrestricted -Scope Process -Force**".
2. Then run again "npm start".


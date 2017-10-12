# CS411 Project Assignment 2: Project User Stories

### Authors
Xavier Bohorquez
Timmy Hoang
Seunghun Oh
Richard Wan

---

#### User Social Media Input:
A user inputs one or more his social media handle and give the user a unique ID in our database.
This is the beginnings of the user using our product. The user begins by inputting any one of his social media handles. Since this project analyzes a user’s social media posts, the user must provide a social media handle to be analyze. The webapp will accept any one of the major social handles listed on the webapp and store the analyzed data under a unique identification of that user.


#### User Views Data:
A user should be able to input their social handles and have them analyzed and displayed.
Once a user has entered his social media handle, our webapp will process the data and display into charts and diagrams. Data from user’s social handles will be categorized based on post sentiment, length, topic, etc. The data’s categories will then be accessed to display diagrams and charts. If there are no posts, we notify the user about the lack of posts. The analysis is stored in the backend under the user’s unique identification. After analysis is displayed, the webapp prompts the user if they want any other social media handles added for analysis. The user also has a choice to make his analysis public or private.


#### User Views Another User's Data:
A user should be able to view another user’s data to varying degrees depending on the target’s consent level.
A search bar in the webapp should be able to search a user by their name to view that searched user’s analysis data. If a queried user’s analysis is public, then the searcher can view the analysis. If the queried user’s analysis is private, then the searcher must ask the queried user for permission to view. This permission granting process can be done on the webapp; once asked for permission, an email goes out to the queried user to allow access to the viewer. If granted, the searching user can now look at the private profile.

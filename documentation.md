# Brisal Rest API

##### How access to uploaded images?
In order to access to uploaded images you need to make a GET request to: "/static/:filename"

##### Authentication
Once you are logged on "/auth/login/" route you get a --Access Token--, this should be inside your header object as "x-access-token" each time you should create, uptade or delete some item inside the database .

##### Glosary
"?" = OPTIONAL

"--auth" = Need "x-access-token"

## Users

 - **GET** "/users" | Get All Users 
   
  - **GET** "/users/:id" | Get User By ID 
   
   - **DELETE** "/users/:id" | Delete User by ID --auth
   
   - **PUT** "/users/update-password" | Update Password --auth

			Body:
				_id: String
				newPassword: String

				
   - **POST** "/users/" | Create User --auth
    
		 Body:
				username: String
				firstName: String
				lastName: String
				password: String
				role?: "ADMIN" || "USER" 
				
 - **PUT** "/users/:id" | Update User --auth
    
		    Body:
				username?: String
				name?: Object
						first: String
						last: String
				

## Dishes

 - **GET** "/Dishes" | Get All Dishes 
   
  - **GET** "/dishes/:id" | Get Dish By ID 
   
   - **DELETE** "/dishes/:id" | Delete Dish by ID --auth
				
   - **POST** "/dishes/" | Create Dish --auth
    
		    Body:
				name: String
				description: String
				category: String	
				price: Number
			File: IMAGE(.JPG || .PNG)
				
 - **PUT** "/dishes/:id" | Update Dishes --auth
    
		     Body:
				name: String
				description: String
				category: String	
				price: Number
				
## Auth

   - **POST** "/auth/signup/" | Signup User
    
		 Body:
				username: String
				firstName: String
				lastName: String
				password: String
				
 **POST** "/auth/login/" |  Login User
 
			Body:
				username: String
				password: String
			Response:
				200: 
					User: UserObject
					Token: String



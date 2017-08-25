 # CRUD Application Example using VueJS #

![Home Page](readimg/home.png?raw=true)
![Signup Page](readimg/signup.png?raw=true)
![Listing Page](readimg/list.png?raw=true)
 
 ## Dependencies ##
 - This application demonstrates creating a crud application using VueJS as client-side tool and acessing data through api.
 - The API used in this example is a third-party api.
 - An extension is required that allows cross origin requests.

 ## Features ##
 - Listing with Pagination
 - User Login
 - Create Product
 - Edit Product
 - Delete Product
 - Search Product
 

 ## Installation & Setup ##

 1. Clone this repository and install its dependencies.
		
		> git clone https://github.com/ankita-acquaintsoft/VueJS-CRUD.git
		
 2. Create a database named "vuejs" and run the below queries

		> CREATE TABLE IF NOT EXISTS `users` (
		    `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
		    `name` varchar(255) DEFAULT NULL,
		    `uname` varchar(255) NOT NULL,
		    `password` varchar(255) NOT NULL,
		    `email` varchar(255) DEFAULT NULL,
		    `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
		    `modified` datetime NOT NULL,
		    `status` enum('0','1') NOT NULL DEFAULT '0',
		    PRIMARY KEY (`id`)
		  ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

 4. Open a browser window and navigate to : http://localhost/VueJS-CRUD/


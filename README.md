# WSO2_USA_Election2016AnnalysisDashBoard
  USA Election 2016 Analyzing Dash board with top recent twitter messages, community graph of each candidate with top 2 and semantic analysis of twittes

Steps to configure the System. 
#Step A: Initial configurations
 1. Download WSO2 Enterprise Service Bus from http://wso2.com/products/enterprise-service-bus/ and extract to /home as <ESB_HOME>. Open <ESB_HOME>/repository/conf/carbon.xml and change the offset of the server to 7 as <offset>7<offset> 
 2. Download WSO2 Complex Event Processor from http://wso2.com/products/complex-event-processor/ and extract to /home as <CEP_HOME>. Open <CEP_HOME>/repository/conf/carbon.xml and change the offset of the server to 0 as <offset>0<offset>
 3. Download WSO2 Data Analytic Server from http://wso2.com/products/data-analytics-server/ and extract to /home as <DAS_HOME>.Open <ESB_HOME>/repository/conf/carbon.xml and change the offset of the server to 3 as <offset>3<offset>
 4. Download the WSO2 twitter connector from https://storepreview.wso2.com/store/assets/esbconnector/313cbd79-c183-43d2-8a6f-fb2721973ed9 and copy the jar to the <ESB_HOME>/repository/components/dropins directory in ESB.
 5.  Download the https://github.com/GDRDABARERA/WSO2_USA_Election2016AnnalysisDashBoard repository.
 6. Install mysql to your local machine using the command : sudo apt-get install mysql-server mysql-client
    Start the MySQL service using the following command   : sudo /etc/init.d/mysql start
    Log in to the MySQL client as the root user (or any other user with database creation privileges): mysql -u root -p
                               Enter the password when prompted.
           ***In most systems, there is no default root password. Press the Enter key without typing anything if you have                not changed the default root password.
    
                               In the MySQL command prompt, create the database using the following command:  create database Election;
    
           ***For users of Microsoft Windows, when creating the database in MySQL, it is important to specify the character               set as latin1. Failure to do this may result in an error (error code: 1709) when starting your cluster. This               error occurs in certain versions of MySQL (5.6.x), and is related to the UTF-8 encoding. MySQL originally                  used the latin1 character set by default, which stored characters in a 2-byte sequence. However, in recent                 versions, MySQL defaults to UTF-8 to be friendlier to international users. Hence, you must use latin1 as the               character set as indicated below in the database creation commands to avoid this problem. Note that this may               result in issues with non-latin characters (like Hebrew, Japanese, etc.). 
 
                               The database creation command should be as follows:
                                    mysql> create database <DATABASE_NAME> character set latin1;
				             For users of other operating systems, the standard database creation commands                                              will suffice. For these  operating systems, the database creation command                                                  should be as follows:.
                                    mysql> create database <DATABASE_NAME>;
                                             Give authorization of the database to the regadmin user as follows: GRANT ALL                                              ON Election.* TO regadmin@localhost     IDENTIFIED BY "regadmin";

                                Once you have finalized the permissions, reload all the privileges by executing the                                        following command:
                                    mysql>  FLUSH PRIVILEGES;

                                Log out from the MySQL prompt by executing the following command: 
                                     mysql>  quit;
 7.change the mysql connection limit in your database using this command after login as mysql -u root -p
    set global max_connections = 10000;
    
    
 #Step B: DAS configurations
 1. Download the MySQL Java connector JAR file, and copy it to the <DAS_HOME>/repository/components/lib/ directory.
 2. Next replace the default h2 database of DAS with the created mySQL database. Edit the default         WSO2_ANALYTICS_EVENT_STORE_DB datasource configuration in the <PRODUCT_HOME>/repository/conf/datasources/analytics-datasources.xml file as shown below.
 
        <datasource>
            <name>WSO2_ANALYTICS_EVENT_STORE_DB</name>
            <description>The datasource used for analytics record store</description>
            <definition type="RDBMS">
                <configuration>
                    <url>jdbc:mysql://localhost:3306/Election</url>
                    <username>root</username>
                    <password>root</password>
                    <driverClassName>com.mysql.jdbc.Driver</driverClassName>
                    <maxActive>80</maxActive>
                    <maxWait>60000</maxWait>
                    <validationQuery>SELECT 1</validationQuery>
                    <defaultAutoCommit>false</defaultAutoCommit>
                    <initialSize>0</initialSize>
                    <testWhileIdle>true</testWhileIdle>
                    <minEvictableIdleTimeMillis>4000</minEvictableIdleTimeMillis>
                </configuration>
            </definition>
        </datasource>


 3. Put the jar files inside the downloaded repository->CommunityGraph->jars into the <DAS_HOME/repository/components/lib directory. 
 4. Build the applications inside the directory cappsForDAS inside Community_graph using ant.
 5. Now run DAS as 	sh <DAS_HOME>/bin/wso2server.sh on your command prompt and open  https://127.0.0.1:9446/carbon/ in your browser. You will get the management console. login it using password=admin and username=admin.
 6. Go to Carbon Application->add and put the ant built car file in to it. DAS will configure.
 7. First run the sparkscript FirstRun mannually so that it will create necessory tables for you.
 
 
  
 
 #Step C: CEP configurations
 1. Configure Database Tables as in database configuration file(DB_Configurations.txt) in the database which you created for DAS. (if you are not configured DAS please use this command : CREAT DATABASE Election;)
 2. Put jar files into your repository/components/dropins folder
Download WSO2 Complex Event Processor from http://wso2.com/products/complex-event-processor/ and extract to /home as . 
 3. Now run the CEP as 
	sh <CEP_HOME>/bin/wso2server.sh on your command prompt.
 4. Visit https://127.0.0.1:9443/carbon/ in your broswer and you can login it using password=admin and username=admin
 5. Goto configuration-> Datasources->Add Datasource
     Datasource Type* 	:RDBMS
     Name* 	: (any_name)
     Description :(Optional)
     Datasource Provider* 	:default
     Driver* 	:com.mysql.jdbc.Driver
     URL* 	:jdbc:mysql://localhost:3306/(DB_Name)
     User Name :(Mysql database user Name)
     Password:(Mysql database user Passeword)
(Keep the other field default)
 And then you can test the conection. If it's ok add the data source
 6. Download the https://github.com/GDRDABARERA/WSO2_USA_Election2016AnnalysisDashBoard repository.
 7. Build the applications inside the directory CEPTweetAnalyticsCApp inside PopularTweetsAnalytics using maven.
 8.  Now run <CEP_HOME> again as and open  https://127.0.0.1:9443/carbon/ in your browser. You will get the management console. login it using password=admin and username=admin.
 9.  Go to Carbon Application->add and put the maven built car file in to it. CEP will configure.
 

 #Step D: ESB configurations
 1. Open the directory /TwitterCollector/TwitterESBParentProject using WSO2 Studio latest version and build to make a car file.
 2. Now run <ESB_HOME> again as and open  https://127.0.0.1:9450/carbon/ in your browser. You will get the management console. login it using password=admin and username=admin.
 3.  Go to Carbon Application->add and put the maven built car file in to it. <ESB_HOME> will configure.


 #Step E: WebApp configurations
 1. Put the WebSiteElection directory inside the <DAS_HOME>/repository/deployment/server/jaggeryapps.
 3. Run all the servers DAS_HOME, ESB_HOME and CEP_HOME.
 4. Run the URL https://localhost:9446/WebSiteElection/index.html  and you may be able to see the USA ELECTION 2016 DASH BOARD. 
 

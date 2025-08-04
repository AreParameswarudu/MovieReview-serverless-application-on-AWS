# MovieReview-serverless-application-on-AWS  
This minor project leverages the advantages of serveless, cutting off the overhead of settingup servers ` (EC2) instances ` , mantaining, backing up, configurations for high availability etc.  
I have used **S3 static web hosting** feature for hosting the frontend of the application, used the conbination of **Gateway API** and **Lambda serverless** for the backend workflow and finally **Dynamodb** which is again a serverless service from AWS for storage of the data that user uploads.  

# Application workflow:  

  The application is very simple and stright forward to use and understand.  
  In the frontend, user can fill the feilds like _Name of the movie_, _ Gener_, _Review_ by them as text.  
  In the backend, after sucessful submission, the _POST_ method from _API gateway_ will trigger the lambda to save the details into _Dynamodb_ database.  
  When user request the reviews, with the _get_ request, the data from database is presented on the frontend.  

# The flow of the application looks as, 

  <img width="1126" height="403" alt="image" src="https://github.com/user-attachments/assets/d9aa38bb-e636-4f89-a90d-f12910f7156d" />
 

## Lets Talk about the setup and configuring the setup,

Instructions

1. Setting up DynamoDB  
        AWS console ---> Dynamodb --> create  
        Name ReviewData ,   
        PK = Name.

     <img width="1901" height="837" alt="Screenshot 2025-07-10 233628" src="https://github.com/user-attachments/assets/97a91a08-643d-48e3-a68e-ed8bbdf612e6" />


2. Settingup an IAM ROLE for lambda functions  
        AWS console ---> IAM ---> Role ----> create role   
        Trusted Entity =  Lambda    
        Permissions  = Dynamodbfull access  
        To attach to Lambda functions
> [!NOTE]  
   > You can fine tune the permission or the policies to the lambda function using custome policy.  
   > Get and add/insert the data from table are the permissions that we need for this project.  


  <img width="1919" height="721" alt="Screenshot 2025-07-10 233818" src="https://github.com/user-attachments/assets/feeffc38-701f-4ed2-adc4-99444fcca85e" />

  <img width="1919" height="685" alt="Screenshot 2025-07-10 233946" src="https://github.com/user-attachments/assets/554d851d-ac12-4c5c-b4d5-5a4296fbb3e7" />

3. Lambda Function for get review data
        AWS console ---> Lambda ---> create function ---> from scratch  
        Name : getreview  
        Run time: Pyhton 3.13  
        Change default execution role   
        use existing IAM role = T-serverless-Lambda-role  
        create the function  
        copy paste the code  
        Deploy

     <img width="1903" height="837" alt="Screenshot 2025-07-10 234931" src="https://github.com/user-attachments/assets/4b64cb1c-3797-47bc-a2c3-39625843678c" />

     
4. Lambda Function for insert review data
        Name : insertReviewData   
        Run time: Pyhton 3.13  
        Change default execution role   
        use existing IAM role = T-serverless-Lambda-role  
        create the function  
        copy paste the code  
        Deploy  

  
5. Create a API Gateway   
   API gateway --> APIs ---> Create API ---> REST API --->New API   
   Name: Review   
   API Endpoint type: Edge-Optimized (available everywhere, Region= Only for that Region)  

   <img width="1919" height="737" alt="Screenshot 2025-07-10 235312" src="https://github.com/user-attachments/assets/7c5dfb79-e903-4e56-9bab-32761420d309" />

  
   Create Method --> Method type : GET , Lambda Function, Region: mumbai, select getEmployee function --> create method  

  <img width="1903" height="793" alt="Screenshot 2025-07-10 235519" src="https://github.com/user-attachments/assets/3dbf0c3a-748f-4d40-85a7-129190da7af5" />

   Create Method --> Method type : POST , Lambda Function, Region: mumbai, select insertEmployeeData function --> create method  

  <img width="1891" height="833" alt="Screenshot 2025-07-10 235930" src="https://github.com/user-attachments/assets/3f27b4fb-3b47-4c03-bb9b-32a65dc1a220" />

  
   Click on API Review --> Enable CORS --> GET and POST --> Save  
   Deploy API --> New Stage --> Name = Review-application  
   Copy the invoke URL and update in script.js    

  <img width="1919" height="663" alt="Screenshot 2025-07-11 000045" src="https://github.com/user-attachments/assets/278d8889-f615-489d-8877-046d33b85f1b" />

       
6. Create a Public S3 Bucket and upload index.html and script.js    
        Bucket name = param-serverless-application  
        disable the block public access options   
        check the acknowledge box  
        keep the remaining defaults.  
   Enable static website hosting:  
       properties--> Edit static web hosting --> Enable ---> index.html --> save changes.  
          
   Go to Bucket Policy and generate a policy for getobject or make the objects public  
        properties --> bucket policy--> Edit --> policy generator  
        Type of policy = s3  
        Effect = Allow    
        Principal = *  
        ARM = arn:aws:s3:::param-serverless-application/*    ` (copy ARM of the bucket + /* ) `  
        add statement  
        generate policy   
        copy and paste the policy   
        save changes 
     
   Open static website URL and Submit the data and click on view all reviews.    

We can even check/query the database ( dynamodb ) for the data that is stored.  

<img width="1899" height="839" alt="Screenshot 2025-07-11 002609" src="https://github.com/user-attachments/assets/ccd5c9d7-d62e-4c5f-9b34-45f291bb30c2" />

   
## Additionals that will leverage the full functionality of the application:  
   Integrate the Cognito to authenticate and authorize users.  
   Use cloud front to host the application to all regions.

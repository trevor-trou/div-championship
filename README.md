# &lt;div /&gt; Championship Series
React-based website to track the results of our weekly &lt;div /&gt; tournaments.

_**See https://div.trouchon.com**_

![Image of div website](/media/div_website.png)

## Project Specifications
### Hosting
This project is hosted using _Amazon Web Services_. There are two main parts to this project: the website and the API. Since this project is low traffic and infrequently used, I've chosen to use on-demand resources instead of persistent infrastructure like EC2.
#### Website
The website is hosted using the following services:
- **S3 Bucket**: Holds the static webpage, script and style sheet files.
- **CloudFront**: Fulfills requests to https://div.trouchon.com. Essentially acts as a proxy for the resources in the S3 bucket. I've opted to use CloudFront that way I can serve the website over HTTPS. CloudFront seemed to be the best way to do this unless I configured a webserver on an EC2 instance. 

The following diagram shows the basic flow of a request to https://div.trouchon.com:

![Website Flow](/media/web_flow.png)

#### API
Once the static website is loaded, the client side script makes a request to the API to get data for the website. The API is hosted using the following services:
- **DynamoDB**: On-demand database for storing the tournament results.
- **Lambda Function**: I'm using a single lambda function (see [getDivScoreboard](/lambda_functions/getDivScoreboard/index.js)) to fulfill requests for data. Lambda is _serverless_, so I don't have to provision a persistent server (like an EC2 instance) to run this backend code.
- **API Gateway**: Fulfills the REST requests to the API and invokes the Lambda function. For example, API Gateway will receive a request to https://div-api.trouchon.com/getScoreboard, invoke the [getDivScoreboard](/lambda_functions/getDivScoreboard/index.js) Lambda function, and then return the results to the sender.

The following diagram shows the basic flow of a request to the API:
![API Flow](/media/api_flow.png)

### Hosting Cost: ($0.50 - $1.00/mo)
I'm using "serverless" or "on-demand" services to host this project. Since this project has low volume traffic, the costs should be negligible (for example, CloudFront charges $0.01 for 10,000 requests and $0.085 per GB of data served). With this in mind, I anticipate that the major cost of this project is the Route 53 Record Set (to host the DNS records for trouchon.com), which comes in at $0.50/mo.

## What is &lt;div /&gt;?
&lt;div /&gt; is similar to the basketball game [PIG](https://www.livestrong.com/article/122201-rules-pig-basketball-game/), except it's played with the letters D-I-V. We're currently hosting weekly &lt;div /&gt; tournaments as a bit of friendly competition in the workplace. The first person to win 2 games wins the tournament and the travelling trophy.

![Trophy](/media/trophy.png)
const BackblazeB2 = require('backblaze-b2');


const b2 = new BackblazeB2({
  applicationKeyId: 'c2758431efdb', // Replace with your Application Key ID
  applicationKey: '005e06ac57ed91ecb06df984004f2c31d4b5908244',      // Replace with your Application Key
});

async function initializeB2() {
  try {
    await b2.authorize(); // Authorize your credentials
    console.log('B2 initialized successfully');
  } catch (error) {
    console.error('Error initializing B2:', error);
  }
}

initializeB2();


async function getAuthorizationToken(bucketName, fileName) {
    try {
      // Authorize with Backblaze B2
      console.log(bucketName,fileName)
      await b2.authorize();
      const fileNamePrefix = encodeURIComponent(fileName); // URL-encode the file name

  
      // Get the authorization token
      const response = await b2.getDownloadAuthorization({
        bucketName,             // Replace with your Bucket Name
        fileNamePrefix: fileNamePrefix, // Prefix of the file for which token is needed
        validDurationInSeconds: 3600, // Token validity (e.g., 1 hour)
      });
  console.log(response,'the response from the auth')
      return response.data.authorizationToken;
    } catch (error) {
      console.error('Error fetching authorization token:', error);
      throw error;
    }
  }

module.exports = {
    b2,
    getAuthorizationToken
};

import AWS from "aws-sdk";


export const uploadFileToS3 = (file) => {
  console.log(file)
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3({
      correctClockSkew: true,
      endpoint: 'https://s3.us-central-1.wasabisys.com',
      accessKeyId: '094CPFUXIE5B40JMFUGU',
      secretAccessKey: 'fZFZa3bTlYFzRJspkAQWhtjK2yuisquSHUa79UqM',
      region: 'us-central-1',
      logger: console

    });
    const params = {
      Bucket: "developmentfactoryuniverseco",
      Key: `dev/${Date.now()}.${file.type.split("/")[1]}`, // Set a key (path) for the file in the bucket
      Body: file,
      ContentType: file.type,
      ACL: "public-read", // Adjust ACL based on your requirements
    };
    ;
    const uploadRequest = new AWS.S3.ManagedUpload({
      params,
      service: s3
    });

    uploadRequest.on('httpUploadProgress', function (event) {
      constprogressPercentage = Math.floor(event.loaded * 100 / event.total);
      console.log('Upload progress ' + progressPercentage);
    });

    uploadRequest.send(function (err, data) {
      if (err) {
        console.log('UPLOAD ERROR: ' + JSON.stringify(err, null, 2));
        reject(err)
      } else {
        console.log('Good upload', data);
        const uri = `https://factory-universe-co.mo.cloudinary.net/a/${data.Key}`;
        console.log(uri)
        resolve({
          uri,
          type: file.type.includes("image")
            ? "IMAGE"
            : file.type.includes("video")
              ? "Video"
              : "DOCUMENT",
        });
      }
    });

  })
};
export const multiUploadToS3 = async (files) => {
  return new Promise((resolve, reject) => {
    let array = [];
    if (files.length == 0) {
      resolve({ uri: array });
      return;
    }
    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      const s3 = new AWS.S3({
        correctClockSkew: true,
        endpoint: 'https://s3.us-central-1.wasabisys.com',
        accessKeyId: '094CPFUXIE5B40JMFUGU',
        secretAccessKey: 'fZFZa3bTlYFzRJspkAQWhtjK2yuisquSHUa79UqM',
        region: 'us-central-1',
        logger: console

      });
      const params = {
        Bucket: "developmentfactoryuniverseco",
        Key: `dev/${Date.now()}.${file.type.split("/")[1]}`, // Set a key (path) for the file in the bucket
        Body: file,
        ContentType: file.type,
        ACL: "public-read", // Adjust ACL based on your requirements
      };

      console.log(file, "upload_file");


      const uploadRequest = new AWS.S3.ManagedUpload({
        params,
        service: s3
      });

      uploadRequest.on('httpUploadProgress', function (event) {
        constprogressPercentage = Math.floor(event.loaded * 100 / event.total);
        console.log('Upload progress ' + progressPercentage);
      });

      uploadRequest.send(function (err, data) {
        if (err) {
          console.log('UPLOAD ERROR: ' + JSON.stringify(err, null, 2));
          reject(err)
        } else {
          console.log('Good upload', data);
          const url = `https://factory-universe-co.mo.cloudinary.net/a/${data.Key}`;
          array.push({
            url,
            type: file.type.includes("image") ? "IMAGE" : "Video",
          });
          console.log(url, "url");
          done();

        }
      });
    }

    function done() {
      if (array.length == files.length) {
        resolve({ uri: array });
      }
    }
  });
};

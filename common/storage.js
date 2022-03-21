var multer = require('multer');
const storage = multer.diskStorage({
	    destination: function (req, file, cb) {
		cb(null, './public/uploads')
	  },
	  filename: function (req, file, cb) {		  
		let extArray = file.originalname.split(".");		
		let extension = extArray[extArray.length - 1]; 
		
        if (extension.toLowerCase() === 'csv')
		{			
		  cb(null, extArray[0] + '-' + Date.now()+'.'+extension);
		}else
		{
		   return cb('Only .csv format allowed!');

		}
	  }
	})
	const upload = multer({ storage: storage, limits: { fileSize: 2000000  } }).single('csvfile');
module.exports=upload;					
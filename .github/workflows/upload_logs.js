const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function uploadLog(filePath, bucketName, supabaseUrl, supabaseKey) {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const folderPath = `logs/${year}-${month}-${day}`;

  const fileName = path.basename(filePath);
  const uploadPath = `${folderPath}/${fileName}`;

  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(uploadPath, fs.createReadStream(filePath), {
        cacheControl: '3600',
        upsert: true,
        contentType: 'text/plain',
      });

    if (error) {
      throw error;
    }

    console.log(`Successfully uploaded ${filePath} to ${bucketName}/${uploadPath}`);
    console.log('Upload data:', data);
    return true;
  } catch (error) {
    console.error(`Error uploading ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role key for server-side operations
  const bucketName = 'logs'; // The specified bucket name

  if (!supabaseUrl || !supabaseKey) {
    console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables must be set.');
    process.exit(1);
  }

  const logFiles = [
    '/var/log/niyali-travel/supabase-migrate.log',
    '/var/log/niyali-travel/frontend-deploy.log',
  ];

  let allUploadsSuccessful = true;
  for (const logFile of logFiles) {
    // Check if the log file exists before attempting to upload
    if (fs.existsSync(logFile)) {
      const success = await uploadLog(logFile, bucketName, supabaseUrl, supabaseKey);
      if (!success) {
        allUploadsSuccessful = false;
      }
    } else {
      console.warn(`Log file not found: ${logFile}. Skipping upload.`);
    }
  }

  if (!allUploadsSuccessful) {
    console.error('One or more log files failed to upload.');
    process.exit(1);
  }
}

main();
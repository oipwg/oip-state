const downloadFile = function(artifact, file){
	// Check if we are in the browser
	if (typeof window !== 'undefined' && artifact && file){
		let download_file_url = "https://gateway.ipfs.io/ipfs/" + artifact.getLocation() + "/" + file.getFilename()

		let iframe = document.createElement('iframe');
		iframe.style.display = "none";
		iframe.src = download_file_url
		window.document.body.appendChild(iframe);
	}
}

module.exports = {
	downloadFile
}
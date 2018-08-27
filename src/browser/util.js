const downloadFile = function(artifact, file){
	// Check if we are in the browser
	if (typeof window !== 'undefined' && artifact && file){
		let download_file_url = "https://gateway.ipfs.io/ipfs/" + artifact.getLocation() + "/" + file.getFilename()

		let download_tag = document.createElement('a');
		download_tag.style.display = "none";
		download_tag.download = file.getFilename()
		download_tag.target = "_blank"
		download_tag.href = download_file_url
		download_tag.click()
	}
}

module.exports = {
	downloadFile
}
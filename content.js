var link_magnet_prefix = "magnet:";
var link_torrent_postfix = ".torrent";
var link_diskimage_file_postfixes = ".iso,.img,.bin";
var link_archive_file_postfixes = ".zip,.rar,.7z,.gz,.tar,.tar.gz";
var link_image_file_postfixes = ".jpg,.jpeg,.png,.tiff,.gif,.psd,.bmp";
var link_video_file_postfixes = ".mpg,.avi,.mpeg,.wmv,.mov,.flv";
var link_other_file_postfixes = ".exe,.msi,.jar";

if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str){
		return this.toLowerCase().slice(0, str.length) == str.toLowerCase();
	};
}

if (typeof String.prototype.endsWith != 'function') {
	String.prototype.endsWith = function (str){
		return this.toLowerCase().slice(this.length - str.length, this.length) == str.toLowerCase();
	};
}

chrome.storage.sync.get(null, function(items) {
  localStorage.setItem("mEnabled", String(items.enabled));
  localStorage.setItem("mDownloadMasterURL", String(items.downloadMasterURL));
  localStorage.setItem("mHandleTorrents", String(items.handleTorrents));
  localStorage.setItem("mHandleMagnets", String(items.handleMagnets));
  localStorage.setItem("mHandleDiskImages", String(items.handleDiskImages));
  localStorage.setItem("mHandleArchives", String(items.handleArchives));
  localStorage.setItem("mHandleImages", String(items.handleImages));
  localStorage.setItem("mHandleVideos", String(items.handleVideos));
  localStorage.setItem("mHandleOther", String(items.handleOther));
  localStorage.setItem("mHandleCustom", String(items.handleCustom));
  localStorage.setItem("mCustomFiles", String(items.customFiles));
});

window.onclick = function(e) { checkClick(e);};

function openLink(url){
  if (url == null || url == undefined){
    console.error("openLink: Invalid link object was specified!");
  }
  if ((document.URL).startsWith("https")){
    console.log("Link origin is from https... Opening in new tab/window.");
    window.open(localStorage.getItem("mDownloadMasterURL") + encodeURIComponent(url),"_blank");
  }else{
    createFrame();
    console.log("openLink: Redirecting link to Asus Download Master URL...");
    window.open(localStorage.getItem("mDownloadMasterURL") + encodeURIComponent(url),"tframe");
  }
}

function checkLink(e,handle,filter){
  if (e.target == null || e.target == undefined){
    console.error("checkLink: Invalid link object was specified!");
  }
  if (handle == null || handle == undefined || handle == ""){
    console.error("checkLink: Invalid handle property was specified!");
  }
  if (filter == null || filter == undefined){
    console.error("checkLink: No extensions we specified!");
  }
  if (localStorage.getItem(handle) === 'true'){
	  var extensions = filter.replace("*","").replace(" ","").split(",");
	  console.log("Checking for extensions [" + extensions + "]...");
	  
	  for (var c = 0; c <= extensions.length - 1; c++){
	    if (e.target.href.endsWith(extensions[c]) || e.target.href.startsWith(extensions[c])) { 
	      e.preventDefault();
	      openLink(e.target.href);
	    }
	  }
	}
}

function checkClick(e){
  if (e.target.tagName == "A" && localStorage.getItem("mEnabled") == "true"){
    checkLink(e,"mHandleMagnets",link_magnet_prefix);
  	checkLink(e,"mHandleTorrents",link_torrent_postfix);
  	checkLink(e,"mHandleVideos",link_diskimage_file_postfixes);
  	checkLink(e,"mHandleVideos",link_archive_file_postfixes);
  	checkLink(e,"mHandleVideos",link_image_file_postfixes);
  	checkLink(e,"mHandleVideos",link_video_file_postfixes);
  	checkLink(e,"mHandleVideos",link_other_file_postfixes);
  	checkLink(e,"mHandleCustom",localStorage.getItem("mCustomFiles"));
  }
}

function createFrame(){
  var iframe = document.createElement("iframe");
  iframe.name = "tframe";
  iframe.width = "400";
  iframe.height = "100";
  iframe.style.border = 0;
  iframe.style.display = "none";

	document.body.appendChild(iframe.cloneNode(false));
}

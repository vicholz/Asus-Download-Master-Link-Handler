var imgAddLink = chrome.extension.getURL("assets/ic_menu_add_link.png");
var imgAddTorrent = chrome.extension.getURL("assets/ic_menu_add_torrent.png");
var dm_icon_sm = chrome.extension.getURL("assets/dm_icon_sm.png");
var dm_icon_m = chrome.extension.getURL("assets/icon_16.png");
var links = document.querySelectorAll("a");
var links_exist = false;

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
  localStorage.setItem("mReplaceImages", String(items.replaceImages));
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

function replaceLink(link){
  if (link == null || link == undefined){
    console.error("replaceLink: Invalid link object was specified!");
  }
  link.href = localStorage.getItem("mDownloadMasterURL") + encodeURIComponent(link.href);
  link.setAttribute('target', 'tframe');
  links_exist = true;
  replaceImage(link);
}

function replaceImage(link){
  if (link == null || link == undefined){
    console.error("replaceImage: Invalid link object was specified!");
  }
  if (localStorage.getItem("mReplaceImages") === 'true'){
    var imgTag = link.getElementsByTagName('img')[0];
    
    if (imgTag != undefined){
      imgTagX = imgTag.width;
      imgTagY = imgTag.height;
      imgTag.src = dm_icon_m;
      imgTag.width = imgTagX;
      imgTag.height = imgTagY;
      imgTag.setAttribute("alt", "Download this using Asus Download Master!");
    }
    if (link.style.backgroundImage != undefined){
      var bgSize = link.style.backgroundSize
      var bgPosition = link.style.backgroundPosition;
      var bgRepeat = link.style.backgroundRepeat;
      link.style.backgroundImage = "url('" + dm_icon_sm + "')";
      link.style.backgroundSize = bgSize;
      link.style.backgroundPosition = bgPosition;
      link.style.backgroundRepeat = bgRepeat;
    }
  }
}

function checkLink(link,handle,filter){
  if (link == null || link == undefined){
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
	    if (link.href.endsWith(extensions[c]) || link.href.startsWith(extensions[c])) { 
	      replaceLink(link);
	    }
	  }
	}
}

window.onload = function(){
  if (localStorage.getItem("mEnabled") == 'true'){
    console.log("Checking links...");
    for (var i=0;i<links.length;i++){
    	
    	checkLink(links[i],"mHandleMagnets",link_magnet_prefix);
    	checkLink(links[i],"mHandleTorrents",link_torrent_postfix);
    	checkLink(links[i],"mHandleVideos",link_diskimage_file_postfixes);
    	checkLink(links[i],"mHandleVideos",link_archive_file_postfixes);
    	checkLink(links[i],"mHandleVideos",link_image_file_postfixes);
    	checkLink(links[i],"mHandleVideos",link_video_file_postfixes);
    	checkLink(links[i],"mHandleVideos",link_other_file_postfixes);
    	checkLink(links[i],"mHandleCustom",localStorage.getItem("mCustomFiles"));
    }
    
    if (links_exist){
      var iframe = document.createElement("iframe");
      iframe.name = "tframe";
      iframe.width = "400";
      iframe.height = "100";
      iframe.style.border = 0;
      iframe.style.display = "none";
    
    	document.body.appendChild(iframe.cloneNode(false));
    }
  }
};
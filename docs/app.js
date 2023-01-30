Vue.prototype.$mylist = '';

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

const mylist = '';

var app = new Vue({
  el: '#app',
  data: {
    scanner: null,
    activeCameraId: null,
    cameras: [],
    scans: [], 
    input_num: 9999,
    mylist: ''
  },
  beforeCreate: function () {
//    console.log(this.$mylist);
  },
  created: function() {
//    console.log(this.$mylist);
//    console.log(this.input_num);
  },

  mounted: function () {
    var self = this;
    self.scanner = new Instascan.Scanner({ 
  // Whether to scan continuously for QR codes. If false, use scanner.scan() to manually scan.
  // If true, the scanner emits the "scan" event when a QR code is scanned. Default true.
  continuous: true,
  
  // The HTML element to use for the camera's video preview. Must be a <video> element.
  // When the camera is active, this element will have the "active" CSS class, otherwise,
  // it will have the "inactive" class. By default, an invisible element will be created to
  // host the video.
  video: document.getElementById('preview'),
  
  // Whether to horizontally mirror the video preview. This is helpful when trying to
  // scan a QR code with a user-facing camera. Default true.
  mirror: true,
  
  // Whether to include the scanned image data as part of the scan result. See the "scan" event
  // for image format details. Default false.
  captureImage: false,
  
  // Only applies to continuous mode. Whether to actively scan when the tab is not active.
  // When false, this reduces CPU usage when the tab is not active. Default true.
  backgroundScan: false,
  
  // Only applies to continuous mode. The period, in milliseconds, before the same QR code
  // will be recognized in succession. Default 5000 (5 seconds).
  refractoryPeriod: 10000,
  
  // Only applies to continuous mode. The period, in rendered frames, between scans. A lower scan period
  // increases CPU usage but makes scan response faster. Default 1 (i.e. analyze every frame).
  scanPeriod: 5
  

        
    });
    self.scanner.addListener('scan', function (content, image) {
//      console.log(self.$mylist);
      self.scans.unshift({ date: +(Date.now()), content: content });
      self.$mylist = (self.$mylist || '') + content + '\n';
//      console.log(self.$mylist);
    });
    Instascan.Camera.getCameras().then(function (cameras) {
      self.cameras = cameras;
      if (cameras.length > 0) {
        self.activeCameraId = cameras[0].id;
        self.scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function (e) {
      console.error(e);
    });
  },
  methods: {
//  beforeCreate: function () {    console.log(this.$mylist)  },
    formatName: function (name) {
      return name || '(unknown)';
    },
    selectCamera: function (camera) {
      this.activeCameraId = camera.id;
      this.scanner.start(camera);
    },
    clickFunction: function () {
        console.log(this.$mylist || '');

        var content = (this.$mylist);
	var blob = new Blob([content], {  type: "text/plain;charset=utf-8" });
	//      FileSaver
	var filename = (new Date().toISOString()) + '.txt';
        saveAs(blob, filename);
        //    this.myResult = this.myGlobalVar;
//	filename = (new Date().toISOString()) + '.txt';
//        download(filename, content);        
    }, 
    addInputFunction: function()
    {
//        console.log(this.input_num);
        var content = this.input_num;
//        console.log(content);
        this.scans.unshift({ date: +(Date.now()), content: content });
        this.$mylist = (this.$mylist || '') + content + '\n';
    }
  }
});

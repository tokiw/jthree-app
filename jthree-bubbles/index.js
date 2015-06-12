jThree( function( j3 ) {

	j3.Trackball();

	initItem( "#inner1" );
	initItem( "#inner2" );
	initItem( "#inner3" );


	function initAnimation( selector ) {
		return setInterval( function() {
			var swX = Math.random() * 2 - 1,
				swY = Math.random() * 2 - 1,
				swZ = Math.random() * 2 - 1,
				x = Math.floor( Math.random() * 700 ) * swX,
				y = Math.floor( Math.random() * 700 ) * swY,
				z = Math.floor( Math.random() * 700 ) * swZ;
			j3( selector ).animate( { positionX: "+=" + x, positionY: "+=" + y, positionZ: "+=" + z }, 3000);
		}, 3100);
	}

	function initItem ( selector ) {
		var timer = initAnimation( selector ),
			isFocus = false,
			obj = j3( selector );
		
		obj.bind( "contextmenu" ,function() {
			isFocus = 0;
			timer = initAnimation( this );
			j3( "#camera" ).animate( { position: [ 2800, 13, 30 ] }, 1000 );
		});

		obj.bind( "click" ,function() {
			if ( !isFocus ) {
				focusItem( this, timer );
				isFocus = true;
			}
		});

		obj.on( "drop", handllerDroppedFile );
		obj.on( "dragenter", cancelEvent );
		obj.on( "dragover", cancelEvent );
	}

	function focusItem( selector, timer ) {
		clearInterval( timer );
		j3( selector ).stop().animate( { position: [ 0, 0, 0 ] }, 1000 );
		j3( "#camera" ).animate( { position: [ 200, 13, 30 ] }, 1000 );
	}

	function cancelEvent( e ) {
		e.preventDefault();
		e.stopPropagation();
	}
	 
	//ファイルがドロップされたら動くコード
	function handllerDroppedFile( e ) {
		//単一ファイルの想定
		var that = this;
		var file = e.originalEvent.dataTransfer.files[0];
		var fileReader = new FileReader();
		var img = document.createElement("img");
		fileReader.onload = function( e ) {
			var txrSelector = j3( j3( that ).attr( "mtl" ) ).attr( "param" ).slice( 4, -1 );
			j3( txrSelector ).attr( "src", e.target.result );
		};
		//imageをdataURIで取得
		fileReader.readAsDataURL(file);
		//デフォルトのイベントキャンセルしないと
		//ブラウザでイメージが表示されてしまう
		cancelEvent(e);
	}
	
	var objNum = 0;
	$( "#obj-add" ).click( function() {
		j3( '<txr id="obj-txr' + objNum + '" src="null" />' ).appendTo( "head" );
		j3( '<mtl id="obj-mtl' + objNum + '" type="MeshBasic" param="map: #obj-txr' + objNum + ';" />' ).appendTo( "head" );
		var obj = j3('<mesh id="obj' + objNum + '" geo="#geo1" mtl="#obj-mtl' + objNum + '" style="scaleX: -1; position: 300 -300 -600;" />').appendTo("scene");
		initItem( obj );
		console.log( j3( "head" ) );
		objNum++;
	});

	$( "#camera-reset" ).click( function() {
		j3( "#camera" ).animate( { position: [ 2800, 13, 30 ] }, 1000 );
	});

},
function() {
	alert( "このブラウザはWebGLに対応していません。" );
} );


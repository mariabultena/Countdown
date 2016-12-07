window.onload = function(){
	var canvas = document.getElementById('sky');
	var ctx = canvas.getContext("2d");
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	var mf = 100;
	var flakes = [];
	for(var i = 0; i < mf; i++){
		flakes.push({
			x:Math.random()*W,
			y:Math.random()*H,
			r:Math.random()*5+2,
			d:Math.random()+1
		})
	}

	function drawFlakes(){
		ctx.clearRect(0,0,W,H);
		ctx.fillStyle="white";
		ctx.beginPath();
		for (var i = 0; i<mf;i++)
		{
			var f = flakes[i];
			ctx.moveTo(f.x, f.y);
			ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		moveFlakes();
	}

	var angle = 0;
	function moveFlakes(){
		angle += 0.01;
		for (var i=0;i<mf;i++) {
			var f = flakes[i];
			f.y += Math.pow(f.d, 2) +1;
			f.x += Math.sin(angle);
			if (f.y > H){
				flakes[i] = {x:Math.random()*W, y:0, r:f.r, d:f.d};
			}
		}
	}
	setInterval(drawFlakes, 25);
}
var countdown = function(end, elements, callback) {
	var _second = 1000,
		_minute = _second * 60,
		_hour = _minute * 60,
		_day = _hour * 24,

		end = new Date(end),
		timer,


		calculate = function() {

			var now = new Date(),
				remaining = end.getTime() - now.getTime(),
				data;

			if(isNaN(end)){
				console.log("Invalid date/time");
				return;
			}

			if(remaining<=0) {
				clearInterval(timer);

				if(typeof callback === 'function') {
					callback();
				}
				
			} else {
				if(!timer){
					timer = setInterval(calculate, _second);

				}

				data = {
					"days":Math.floor(remaining/_day),
					"hours":Math.floor((remaining % _day)/_hour),
					"minutes":Math.floor((remaining % _hour)/_minute),
					"seconds":Math.floor((remaining % _minute)/_second)
					}

				if(elements.length) {
					for(x in elements) {
						var x = elements[x];
						data[x] = ("00" + data[x]).slice(-2);
						document.getElementById(x).innerHTML = data[x];
					}
				}

			}
			
			
		};

	calculate();
}
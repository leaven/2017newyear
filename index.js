function $(el) {
	return document.querySelector(el);
}
/**
 * [easeInOutExpo description]
 * @param  {[type]} t [动画执行到当前帧经过的时间]
 * @param  {[type]} b [起始的值]
 * @param  {[type]} c [总的位移值]
 * @param  {[type]} d [持续时间]
 * @return {[type]}   [description]
 */
Math.easeInOutExpo = function(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
	t--;
	return c/2 * (-Math.pow(2, -10 * t) + 2) + b;
}
var Partical = function(params) {
	this.x = params.x
	this.y = params.y
	this.rgba = params.rgba
	this.canvas = params.canvas
	this.ctx = this.canvas.getContext('2d')

	// 
	this.sx = Math.random() * this.canvas.width
	this.sy = Math.random() * this.canvas.height
}
var frame = ['liwei', 'heart', 'lvfang'] // 维护一个动画数组
var T = 0 
var App = {
	canvas: null,
	ctx: null,
	particle: [], // 粒子对象数组
	position: [], // 粒子位置坐标
	init: function() {
		this.initCanvas()
		// this.particleMap = {
		// 	liwei: this.getLiwei(),
		// 	lvfang: this.getLvfang(),
		// 	heart: this.getHeart()
		// }
		this.liweiParticles = this.getLiwei()
		this.lvfangParticles = this.getLvfang()
		this.heartParticles = this.getHeart()
		this.particleMap = {
			'liwei': this.liweiParticles,
			'heart': this.heartParticles,
			'lvfang': this.lvfangParticles
		}
		var name = frame.shift()
		frame.push(name)
		this.drawPartical(name)
		// setTimeout(function() {
		// 	this.drawPartical(this.particleMap['liwei'])
		// }.bind(this), 0)
		// this.spread()
		// var func = frame.shift()
		// this[func]()
	},
	initCanvas: function() {
		this.canvas = $('#newyear')
		if (this.canvas.getContext) {
			this.ctx = this.canvas.getContext('2d')
		}
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		this.x0 = this.canvas.width / 2
		this.y0 = this.canvas.height / 2
	},
	fillText: function (txt) {
        this.ctx.textAlign = 'center';
       
       
	},
	getLiwei: function() {
		this.ctx.font = '100px sans-serif'
		this.ctx.textBaseline = 'top'
        this.ctx.fillText('李炜', 0, 0)
        // this.ctx.fillText('前端', 0, 150)
        return this.getParticle(0, 0, this.canvas.width, 100)
		// var imageData = this.ctx.getImageData(0, 0, this.canvas.width, 150)
		// this.getParticle(imageData)
	},
	getLvfang: function() {
		this.ctx.font = '100px sans-serif'
		this.ctx.textBaseline = 'top'
		this.ctx.fillStyle = '#000'
		this.ctx.fillText('前端', 0, 150)
		return this.getParticle(0, 150, this.canvas.width, 100)
	},
	getHeart: function() {
		var img = $('#heart')
		this.ctx.drawImage(img, 0, 300, 100, 100)
		return this.getParticle(0, 300, 100, 100)
	},
	drawLogo: function() {
		var image = new Image()
		image.onload = function() {
			this.ctx.drawImage(image, this.canvas.width/2, this.canvas.height/3, 100, 100)
			var imageData = this.ctx.getImageData(this.canvas.width/2, this.canvas.height/3, 100, 100)
			this.getParticle(imageData)
		}.bind(this)
		image.src = './img/heart-icon-2.png'
	},
	getParticle: function(x, y, w, h) {
		var imageData = this.ctx.getImageData(x, y, w, h),
			imageList = imageData.data,
			width = imageData.width,
			height = imageData.height,
			place = 0,
			particle = [],
			position = [];

		// i表示行，j标识列
		for(var i = 0; i < height; i++) {
			particle[i] = [];
			for (var j = 0; j < width; j++) {
				particle[i][j] = {};
				particle[i][j].r = imageList[(i * width + j) * 4]
				particle[i][j].g = imageList[(i * width + j) * 4 + 1]
				particle[i][j].b = imageList[(i * width + j) * 4 + 2]
				particle[i][j].a = imageList[(i * width + j) * 4 + 3]

				if (place++ % 4 === 0 && (particle[i][j].r !== 255 && particle[i][j].g !== 255 && particle[i][j].b !== 255)) {
					this.ctx.fillStyle = 'rgba(' + particle[i][j].r + ',' + particle[i][j].g + ',' + particle[i][j].b + ',' + particle[i][j].a + ')'
					position.push({
						x: j + (Math.random() - 0.5) * 5 + this.canvas.width / 2,
						y: i + (Math.random() - 0.5) * 5 + this.canvas.height / 3, 
						sx: Math.random() * this.canvas.width,
						sy: Math.random() * this.canvas.height,
						rgba: this.ctx.fillStyle
					})
					// this.ctx.fillRect(x, y, 1, 1)
				}
			}
		}
		return position
		// this.drawLogoByParticle()
	},
	drawLogoByParticle: function() {
		var height = this.particle.length || 0,
			width = this.particle[0].length || 0,
			x,
			y,
			place = 0;
		for(var i = 0; i < height; i++) {
			for(var j = 0; j < width; j++) {
				if (place++ % 4 === 0 && (this.particle[i][j].r !== 255 && this.particle[i][j].g !== 255 && this.particle[i][j].b !== 255)) {
					this.ctx.fillStyle = 'rgba(' + this.particle[i][j].r + ',' + this.particle[i][j].g + ',' + this.particle[i][j].b + ',' + this.particle[i][j].a + ')'
					x = j + (Math.random() - 0.5) * 5
					y = i + (Math.random() - 0.5) * 5
					this.position.push({
						x: x,
						y: y, 
						sx: Math.random() * this.canvas.width,
						sy: Math.random() * this.canvas.height,
						rgba: this.ctx.fillStyle
					})
					// this.ctx.fillRect(x, y, 1, 1)
				}
			}
		}
		// this.expand()
		this.focus()

		// setTimeout(function() {
			// this.clearCanvas()
			// this.spread()
		// }.bind(this), 1000)
	},
	expand: function() {
		var height = this.particle.length || 0,
			width = this.particle[0].length || 0,
			ox = width / 2,
			oy = height / 2; // 中心点坐标位置
		
		for (var i = 0 , len = this.position.length; i < len; i++) {
			this.position[i].x  = this.canvas.width/2 + this.position[i].x * 2 - ox - 100
			this.position[i].y  = this.canvas.height/3 + this.position[i].y * 2 - oy
			this.ctx.fillStyle = this.position[i].rgba
			this.ctx.fillRect(this.position[i].x, this.position[i].y, 2, 2)
		}
	},
	drawPartical: function(name) {
		var particles = this.particleMap[name]
		this.clearCanvas()
		T = T + 2
		var t = T / 100
		var dx = 0,
			dy = 0;

		for (var i = 0 , len = particles.length; i < len; i++) {
			dx = Math.easeInOutExpo(t, 0, particles[i].x - particles[i].sx, 1)
			dy = Math.easeInOutExpo(t, 0, particles[i].y - particles[i].sy, 1)
			this.ctx.fillStyle = particles[i].rgba
		    this.ctx.fillRect(particles[i].sx + dx, particles[i].sy + dy, 2, 2)
		}
		if (t <= 1) {
			this.animationId = requestAnimationFrame(function() {
				this.drawPartical(name)
			}.bind(this))
		} else {
			T = 0
			cancelAnimationFrame(this.animationId)
			this.animationId = null
			setTimeout(function() {
				this.spread(name)
			}.bind(this), 500)
		}
	},
	// 粒子扩散效果
	spread: function(name) {
		var particles = this.particleMap[name]
		this.clearCanvas()
		// this.ctx.fillRect(this.x++, this.y, 20, 20)
		// this.animationId = requestAnimationFrame(this.spread.bind(this))


	    if (T > 100) {
	        T = 0
	    } else {
	        T += 2
	    }

	    var t = T / 100
	    var dx = 0,
			dy = 0;
	    // 贝塞尔曲线
	 //    for (var i = 0 , len = this.position.length; i < len; i++) {
		//     var x1 = Math.pow(2, (1 - t)) * this.position[i].x + 2 * t * (1 - t) * 0 + Math.pow(2, t) * this.position[i].sx
		//     var y1 = Math.pow(2, (1 - t)) * this.position[i].y + 2 * t * (1 - t) * 0 + Math.pow(2, t) * this.position[i].sy
		//     this.ctx.fillStyle = this.position[i].rgba
		//     this.ctx.fillRect(x1, y1, 2, 2)
		// }
		for (var i = 0 , len = particles.length; i < len; i++) {
			dx = Math.easeInOutExpo(t, 0, particles[i].sx - particles[i].x, 1)
			dy = Math.easeInOutExpo(t, 0, particles[i].sy - particles[i].y, 1)
			this.ctx.fillStyle = particles[i].rgba
		    this.ctx.fillRect(particles[i].x + dx, particles[i].y + dy, 2, 2)
		}
		if (t <= 1) {
			this.animationId = requestAnimationFrame(function() {
				this.spread(name)
			}.bind(this))
		} else {
			T = 0
			cancelAnimationFrame(this.animationId)
			this.animationId = null
			setTimeout(function() {
				if (frame.length) {
					var name = frame.shift()
					frame.push(name)
					this.drawPartical(name)
				}
			}.bind(this), 500)
		}

	},
	reset: function() {
		this.clearCanvas()
		this.position = []
		this.particle = []
	},
	clearCanvas: function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}
}
window.onload = App.init.bind(App);

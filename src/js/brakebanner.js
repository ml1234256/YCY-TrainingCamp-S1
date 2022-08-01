class BrakeBanner{
	constructor(selector){
		this.app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerWidth,
			backgroundColor: 0xffffff,
			resizeTo: window
		})
		document.querySelector(selector).appendChild(this.app.view)
		
		this.stage = this.app.stage
		
		this.loader = new PIXI.Loader()
		this.loader.add('btn.png', 'images/btn.png')
		this.loader.add('btn_circle.png', 'images/btn_circle.png')
		this.loader.add('brake_bike.png', 'images/brake_bike.png')
		this.loader.add('brake_handlerbar.png', 'images/brake_handlerbar.png')
		this.loader.add('brake_lever.png', 'images/brake_lever.png')
		this.loader.load()
         
		this.loader.onComplete.add(() => {
		   show()
		})

		const show = () => { 
			const actionButton = createActionButton()
			actionButton.x = actionButton.y = 400
			const bikeContainer = new PIXI.Container()

			bikeContainer.scale.x = bikeContainer.scale.y = 0.3

            const brakeBikeImage = new PIXI.Sprite(this.loader.resources['brake_bike.png'].texture)
			const brakeLevelImage = new PIXI.Sprite(this.loader.resources['brake_lever.png'].texture)
            const brakeHanderbarImage = new PIXI.Sprite(this.loader.resources['brake_handlerbar.png'].texture)
			bikeContainer.addChild(brakeBikeImage,brakeLevelImage, brakeHanderbarImage)

			brakeBikeImage.alpha = 0.5
			// 设置把手旋转中心，固定把手位置
            brakeLevelImage.pivot.x = brakeLevelImage.pivot.y = 455
			brakeLevelImage.x = 722
			brakeLevelImage.y = 900
  
			// 设置把手动画
			actionButton.interactive = true
			actionButton.buttonMode = true
            
			const duration = .4
			actionButton.on('mousedown', () => {
				gsap.to(brakeLevelImage, {duration:duration, rotation: Math.PI/180*-30})
				gsap.to(brakeBikeImage, {duration: duration, alpha: 1})
				gsap.to(bikeContainer, {duration: duration, y: bikeContainer.y + 20})
				//bikeContainer.y += 20
			    parse()
			})

			actionButton.on('mouseup', () => {
				gsap.to(brakeLevelImage, {duration: duration, rotation: 0})
				gsap.to(brakeBikeImage, {duration: duration, alpha: 0.5})
				gsap.to(bikeContainer, {duration: duration, y: bikeContainer.y - 20})
				//bikeContainer.y -= 20
			    start()
			})
            

            // 使自行车始终固定在右下角
			const resize = () => {
				bikeContainer.x = window.innerWidth - bikeContainer.width
				bikeContainer.y = window.innerHeight - bikeContainer.height
			}
			window.addEventListener('resize', resize)
			resize()
           
            // 创建粒子
			const particleContainer = new PIXI.Container()
			this.stage.addChild(particleContainer, bikeContainer, actionButton)

			particleContainer.pivot.x = window.innerWidth / 2
			particleContainer.pivot.y = window.innerHeight / 2
			particleContainer.x = window.innerWidth / 2
			particleContainer.y = window.innerHeight / 2
			

			particleContainer.rotation = 35 * Math.PI /180

			const particles = []
			const colors = [0xf1cf54, 0xb5cea8, 0xf1cf54, 0x818181, 0x000000]

			for (let i = 0; i < 10; i++) {
				let gr = new PIXI.Graphics()
				gr.beginFill(colors[Math.floor(Math.random() * colors.length)])
				gr.drawCircle(0, 0, 6)
				gr.endFill()

				// 粒子运动初始坐标
				const pItem = {
					sx: Math.random() * window.innerWidth,
					sy: Math.random() * window.innerHeight,
					gr: gr
				}
				
				gr.x = pItem.sx
				gr.y = pItem.sy

				particleContainer.addChild(gr)
				particles.push(pItem)
			}

			
			// 让粒子向下运动
			let speed = 0
			const loop = () => {
				speed += 0.5
				speed = Math.min(speed, 20)
				for (let i = 0; i < particles.length; i++) {
					let pItem = particles[i]
					pItem.gr.y += speed
					if (speed >= 20) {
						pItem.gr.scale.x = 0.03
					    pItem.gr.scale.y = 40
					}
					if (pItem.gr.y > window.innerHeight) pItem.gr.y = 0
				}
			}

			const start = () => {
				// speed = 0
				gsap.ticker.add(loop)
			}
			const parse = () => {
				gsap.ticker.remove(loop)
				for (let i = 0; i < particles.length; i++) {
					let pItem = particles[i]
	
					pItem.gr.scale.x = 1
					pItem.gr.scale.y = 1

					gsap.to(pItem.gr, {duration: 0.6, x:pItem.sx, y:pItem.sy, ease:'elastic.out'})
				}
			}
			
            start()
		}
		const createActionButton = () => {
			const actionButton = new PIXI.Container()
			 
            const btn = new PIXI.Sprite(this.loader.resources['btn.png'].texture)
            const btnCircle = new PIXI.Sprite(this.loader.resources['btn_circle.png'].texture) 		
			const btnCircle1 = new PIXI.Sprite(this.loader.resources['btn_circle.png'].texture) 		        
			
			actionButton.addChild(btn, btnCircle, btnCircle1)

			btn.pivot.x = btn.pivot.y = btn.width / 2
			btnCircle.pivot.x = btnCircle.pivot.y = btnCircle.width / 2
			btnCircle1.pivot.x = btnCircle1.pivot.y = btnCircle1.width / 2
			
			btnCircle.scale.x = btnCircle.scale.y = 0.8
			gsap.to(btnCircle.scale, { duration: 1, x: 1.3, y: 1.3, repeat: -1 })
			gsap.to(btnCircle, {duration: 1, alpha: 0, repeat: -1})
			return actionButton
		 }
	}
}
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

			bikeContainer.scale.x = bikeContainer.scale.y = 0.2

            const brakeBikeImage = new PIXI.Sprite(this.loader.resources['brake_bike.png'].texture)
			const brakeLevelImage = new PIXI.Sprite(this.loader.resources['brake_lever.png'].texture)
            const brakeHanderbarImage = new PIXI.Sprite(this.loader.resources['brake_handlerbar.png'].texture)
			bikeContainer.addChild(brakeBikeImage,brakeLevelImage, brakeHanderbarImage)
			this.stage.addChild(bikeContainer, actionButton)

			// 设置把手旋转中心，固定把手位置
            brakeLevelImage.pivot.x = brakeLevelImage.pivot.y = 455
			brakeLevelImage.x = 722
			brakeLevelImage.y = 900
  
			// 设置把手动画
			actionButton.interactive = true
			actionButton.buttonMode = true

			actionButton.on('mousedown', () => {
				gsap.to(brakeLevelImage, {duration:.3, rotation: Math.PI/180*-30})
			})

			actionButton.on('mouseup', () => {
				gsap.to(brakeLevelImage, {duration:.3, rotation: 0})
			})
            

            // 使自行车始终固定在右下角
			const resize = () => {
				bikeContainer.x = window.innerWidth - bikeContainer.width
				bikeContainer.y = window.innerHeight - bikeContainer.height
			}
			window.addEventListener('resize', resize)
			resize()
		}
		const createActionButton = () => {
			const actionButton = new PIXI.Container()
			
            const btn = new PIXI.Sprite(this.loader.resources['btn.png'].texture)
            const btnCircle = new PIXI.Sprite(this.loader.resources['btn_circle.png'].texture) 		    
			
			actionButton.addChild(btn)
			actionButton.addChild(btnCircle)

			btn.pivot.x = btn.pivot.y = btn.width / 2
			btnCircle.pivot.x = btnCircle.pivot.y = btnCircle.width / 2
			
			btnCircle.scale.x = btnCircle.scale.y = 0.8
			gsap.to(btnCircle.scale, { duration: 1, x: 1.3, y: 1.3, repeat: -1 })
			gsap.to(btnCircle, {duration: 1, alpha: 0, repeat: -1})
			return actionButton
		 }
	}
}
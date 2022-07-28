class BrakeBanner{
	constructor(selector){
		this.app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerWidth,
			backgroundColor: 0xffff00,
		})
		document.querySelector(selector).appendChild(this.app.view)
		
		this.stage = this.app.stage
		
		this.loader = new PIXI.Loader()
		this.loader.add('btn.png', 'images/btn.png')
		this.loader.add('btn_circle.png', 'images/btn_circle.png')
		this.loader.load()
         
		this.loader.onComplete.add(() => {
			show()
		})

		const show = () => { 
			const actionButton = new PIXI.Container()
			this.stage.addChild(actionButton)

            const btn = new PIXI.Sprite(this.loader.resources['btn.png'].texture)
            const btnCircle = new PIXI.Sprite(this.loader.resources['btn_circle.png'].texture) 		    
			
			actionButton.addChild(btn)
			actionButton.addChild(btnCircle)

			btn.pivot.x = btn.pivot.y = btn.width / 2
			btnCircle.pivot.x = btnCircle.pivot.y = btnCircle.width / 2
            actionButton.x = actionButton.y = 400
			
			btnCircle.scale.x = btnCircle.scale.y = 0.8
			gsap.to(btnCircle.scale, { duration: 1, x: 1.3, y: 1.3, repeat: -1 })
			gsap.to(btnCircle, {duration: 1, alpha: 0, repeat: -1})
		}
		
	}
}
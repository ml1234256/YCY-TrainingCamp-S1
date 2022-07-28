class BrakeBanner{
	constructor(selector){
		this.app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerWidth,
			backgroundColor: 0xffff00,
		})
		document.querySelector(selector).appendChild(this.app.view)

		this.loader = new PIXI.Loader()
		this.loader.add('btn.png', 'images/btn.png')
		this.loader.load()

		const sprite = PIXI.Sprite(this.loader.reasources['btn.png'].texture)
		this.app.stage.addChild(sprite)
	}
}
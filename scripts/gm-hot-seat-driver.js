Hooks.on("controlToken", (token, isControlled) => {
	let gameSettingsEnabled = game.settings.get('foundry-hot-seat-observer', 'hotSeatObserver') && game.settings.get('foundry-hot-seat-observer', 'toggleGMSelect');
	let tokenViableForChange = token.actor && token.actor.isPC;
      	if (gameSettingsEnabled && tokenViableForChange && game.user.isGM === true) {
	    let hotSeatPlayerName = game.settings.get('foundry-hot-seat-observer', 'hotSeatPlayerName')
            let hotSeatPlayerUser = game.users.players.find(t => t.name === hotSeatPlayerName);

            if(hotSeatPlayerUser){
              	hotSeatPlayerUser.update({character: token.actor.id}, {controlled: isControlled});
            }
	
	    //token.actor.update({}, {user: hotSeatPlayerUser});
	    token.actor.update({}, {token: token._id});

		
		
	}
});



Hooks.on("updateUser", (user, updateData, options, userId) => {
	let gameSettingsEnabled = game.settings.get('foundry-hot-seat-observer', 'hotSeatObserver') && game.settings.get('foundry-hot-seat-observer', 'toggleGMSelect');
	let isCorrectUser = game.user._id == updateData._id && !game.user.isGM && game.user.name == game.settings.get('foundry-hot-seat-observer', 'hotSeatPlayerName');
	if(gameSettingsEnabled && isCorrectUser && updateData.hasOwnProperty("character") && options.hasOwnProperty("controlled")){
		const actor = game.actors.get(updateData.character);
    		const tokens = actor.getActiveTokens();
    		if ( tokens.length && options.controlled ) tokens[0].control();
		else if (tokens.length && !options.controlled) tokens[0].release();	
	}
});

Hooks.on("updateActor", (actor, actorData, options, actorId) => {
	let gameSettingsEnabled = game.settings.get('foundry-hot-seat-observer', 'hotSeatObserver') && game.settings.get('foundry-hot-seat-observer', 'toggleGMSelect');
	//let isCorrectUser = game.user._id == updateData._id && !game.user.isGM && game.user.name == game.settings.get('foundry-hot-seat-observer', 'hotSeatPlayerName');
	if(gameSettingsEnabled && options.hasOwnProperty("token")){
	    let hotSeatPlayerName = game.settings.get('foundry-hot-seat-observer', 'hotSeatPlayerName')
            let hotSeatPlayerUser = game.users.players.find(t => t.name === hotSeatPlayerName);
		
		
	}
});




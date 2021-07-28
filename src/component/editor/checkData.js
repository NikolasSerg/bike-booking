

switch (event.target.name) {
    case 'name':
        let newState = {...state}
        let name = event.target.value;
        let check = "";
        for (const item in total) {
            if(item.name === name) {
                check = true
                break
            } else {
                check = false
            };
        }

        if(check === false && name.length >= 5) {
            newState.bike.name.valid = true;
            newState.bike.name.class = 'success';
            setState(newState)
        } else if(check === true) {
            newState.bike.name.valid = false;
            newState.bike.name.message = 'this name exist';
            newState.bike.name.class = 'error';
            setState(newState)
        } else if(check === false && name.length < 5) {
            newState.bike.name.message = 'name has to be minimum 5 characters';
            newState.bike.name.class = 'error';
            setState(newState);
        }
        console.log(check, ' - check')
        newState.bike.name.value = name;
        setState(newState)
        console.log(state.bike.name)
        break
    case 'type':
        let newType = {...state};
        console.log(event.target.value, ' - SELECT value')
        newType.bike.type = event.target.value;
        setState(newType)
        break
    case 'color':
        let newColor = {...state};
        newColor.bike.color = event.target.value;
        setState(newColor)
        break
    case 'wheel':
        let newWheel = {...state};
        newWheel.bike.wheel = event.target.value;
        setState(newWheel)
        break
    case 'price':
        let newPrice = {...state};
        newPrice.bike.price = parseInt(event.target.value);
        setState(newPrice)
        break
    case 'id':
        let newId = {...state};
        newId.bike.id = event.target.value;
        setState(newId)
        console.log(state)
        break
    case 'description':
        let newDescription = {...state};
        newDescription.bike.description = event.target.value;
        setState(newDescription)
        break
}
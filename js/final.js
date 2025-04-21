
function displayItems() {
    const displayArea = $('#displayArea');
    if (displayArea.length) {
        displayArea.html('');
        const items = getItems();
        items.forEach(item => {
            const itemElement = $('<div></div>').addClass('item');
            const idElement = $('<div></div>').addClass('item-id').text(`ID: ${item.id}`);
            const nameElement = $('<input type="text">').addClass('item-name').val(item.name);
            const typeElement = $('<input type="text">').addClass('item-type').val(item.type);
            const imageElement = $('<img>').attr('src', item.imageUrl).addClass('item-image').css({
                width: '50px',
                height: '50px',
                borderRadius: '50%'
            });

// ^ js styling to ensure priority.

            const saveButton = $('<button>Update!</button>').addClass('save-button').data('id', item.id);
            itemElement.append(imageElement).append(' ').append(idElement).append(' ~~ ').append(nameElement).append(' ~~ ').append(typeElement).append(' ').append(saveButton);
            displayArea.append(itemElement);
        });
    } else {
        console.error('Pokemon not found');
    }
}

function createItem() {
    const id = prompt('Enter ID:');
    const name = prompt('Enter Name:');
    const type = prompt('Enter Type: (Ex: Fire, Grass, or Water)');
    const defaultImageUrl = 'images/loveball.webp';
    const items = getItems();
    items.push({ id: parseInt(id), name, type, imageUrl: defaultImageUrl });
    displayItems();
    $('#status').text('Team Member Added!').show().fadeOut(3000);
}

function readItem() {
    const id = prompt('Enter ID to read:');
    const items = getItems();
    const item = items.find(item => item.id === parseInt(id));
    if (item) {
        $('#readResult').html(`
            ID: ${item.id}, ~~ Name: ${item.name}, ~~ Type: ${item.type}, ~~ Moves: ${item.moves},<br>
            <img src="${item.imageUrl}" alt="${item.name}" style="width:100px;height:100px;">
        `).fadeIn().delay(5000).fadeOut();
    } else {
        $('#readResult').html('Item not found');
    }
}

 // ^ fadeOut method from W3schools allows the webpage to reset after the functions and alerts.

function updateItem(id, newName, newType) {
    const items = getItems();
    const item = items.find(item => item.id === parseInt(id));
    if (item) {
        item.name = newName;
        item.type = newType;
        item.imageUrl = 'images/loveball.webp'; 
        delete item.moves;
        
        displayItems();
        $('#status').text('Member updated successfully!').show().fadeOut(3000);
    } else {
        alert('Item not found');
    }
}

// ^ updated items share a universal generic image for consistency.

function deleteItem() {
    const id = prompt('Type ID to delete:');
    const items = getItems();
    const index = items.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
        items.splice(index, 1);
        displayItems();
        $('#status').text('Member Removed successfully').show().fadeOut(3000);
    } else {
        alert('Item not found');
    }
}

$(document).on('click', '.save-button', function() {
    const id = $(this).data('id');
    const itemElement = $(this).closest('.item');
    const newName = itemElement.find('.item-name').val();
    const newType = itemElement.find('.item-type').val();
    updateItem(id, newName, newType);
});

// ^ finishes the update function.

$('.button').on('click', function(event) {
    const action = $(event.target).data('action');
    if (action === 'create') createItem();
    if (action === 'read') readItem();
    if (action === 'delete') deleteItem();
});

displayItems();

// ^ calls the established displayItems function.
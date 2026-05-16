document.addEventListener('DOMContentLoaded', function ()
{
	const customMenu = document.getElementById('contextMenu');
	const content = document.querySelector('body');

	// Flag to track if the custom context menu is open
	let isContextMenuOpen = false;

	// Show the context menu
	content.addEventListener('contextmenu', function (event)
	{
		event.preventDefault();

		// Open or reopen the menu
		customMenu.style.display = 'block';

		// Adjust the x and y coordinates based on the viewport dimensions
		const scrollY = window.scrollY || window.pageYOffset;
		const menuWidth = customMenu.offsetWidth;
		const menuHeight = customMenu.offsetHeight;
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		let x = event.clientX + 'px';
		let y = event.clientY + scrollY + 'px';

		// Check if the menu goes beyond the right edge
		if (event.clientX + menuWidth > windowWidth)
		{
			x = windowWidth - menuWidth + 'px';
		}

		// Check if the menu goes beyond the bottom edge
		if (event.clientY + menuHeight > windowHeight + scrollY)
		{
			y = windowHeight - menuHeight + scrollY + 'px';
		}

		customMenu.style.left = x;
		customMenu.style.top = y;
 
		isContextMenuOpen = true;
	});

	// Handle menu item clicks
	customMenu.addEventListener('click', function (event)
	{
		const menuItemId = event.target.id;
		switch (menuItemId)
		{
			default:
				break;
			case 'menu-item-1':
				ToggleThemes();
				break;
		}

		// Hide the context menu after clicking
		customMenu.style.display = 'none';
		isContextMenuOpen = false;
	});

	// Prevent right-click on the context menu itself
	customMenu.addEventListener('contextmenu', function (event)
	{
		event.preventDefault();
	});

	// Hide the context menu on left-click outside of it
	document.addEventListener('click', function (event)
	{
		if (isContextMenuOpen && !customMenu.contains(event.target))
		{
			customMenu.style.display = 'none';
			isContextMenuOpen = false;
		}
	});
});
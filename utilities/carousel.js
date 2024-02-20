/* 

Carousel builder utility 

This utility is used to build a multi-item carousel from a list of items.
The items are assumed to be in a list of divs with the id "resource_items".
The carousel is built from a template div with the id "template_carousel_item".
The carousel items are added to a div with the id "template_carousel_inner".

The number of items per carousel item is specified by the "itemsPerGroup" parameter.

*/

function buildMultiCarousel(itemType, itemsPerGroup=0) {
  var resource_items = [];
  let resources = document.getElementById("resource_items");
  var number_of_resources = resources.children.length;
  if (itemsPerGroup == 0 || itemsPerGroup > number_of_resources) {
    itemsPerGroup = number_of_resources;
  }
  for (var c = 0; c < resources.children.length; c++) {
    resource_items.push(resources.children[c]);
  }
  //console.log("source items:", items);

  var template_inner = document.getElementById("template_carousel_inner");
  var template_item = document.getElementById("template_carousel_item");

  // Do this for the number of resource items
  for (var resource_number = 0; resource_number < resource_items.length; resource_number++) {
    // Start filling based on which item were looking at.
    var start_resource = resource_number;

    // Create a new carousel item based on the template item
    // and add to carousel list 
    var target_item = template_item.cloneNode(true);
    template_inner.appendChild(target_item);

    // Set id (for debugging only).
    //target_item.id = resource_number;

    // Set first carousel item active by default
    if (resource_number == 0) {
      target_item.classList.add("active");
    }
    //console.log("---- update carousel item: ", target_item);

    // Append "itemsPerGroup" number of resource items to
    // the row for the current carousel item.
    for (var resource_offset = 0; resource_offset < itemsPerGroup; resource_offset++) {
      // Use modulo to wrap around 
      var itemIndex = (start_resource + resource_offset) % resource_items.length;
      // Create a copy of the resource item
      newItem = resource_items[itemIndex].cloneNode(true);
      //console.log("add: ", newItem)

      // Add to "row" for the carousel item
      var rowItem = target_item.children[0];
      rowItem.appendChild(newItem);
    }
  }
}

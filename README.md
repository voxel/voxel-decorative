# voxel-decorative

Decorative blocks you can craft (voxel.js plugin)

![screenshot](http://i.imgur.com/WOkrODC.png "Screenshot")

Currently includes:

* Storage blocks - craft 9x item (e.g. using a [voxel-workbench](https://github.com/deathcap/voxel-workbench))
 * Block of Coal
 * Block of Iron
 * Block of Gold
 * Block of Diamond
 * Craft by itself to unblock
* Stone bricks - craft 2x2, then by itself
 * Stone Bricks
 * Carved Stone Bricks
 * Cracked Stone Bricks

The base materials should be provided by another plugin (such as [voxel-land](https://github.com/deathcap/voxel-land)).
The storage blocks have double the hardness of the ore (if applicable), or as set by the `storageHardnessFactor` option;
the stone bricks have hardness equal to cobblestone.
Uses [voxel-registry](https://github.com/deathcap/voxel-registry) and [voxel-recipes](https://github.com/deathcap/voxel-recipes).

## License

MIT


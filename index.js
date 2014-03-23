'use strict';

module.exports = function(game, opts) {
  return new DecorativePlugin(game, opts);
};

module.exports.pluginInfo = {
  loadAfter: ['voxel-registry', 'voxel-land', 'voxel-recipes']
};

function DecorativePlugin(game, opts) {
  this.registry = game.plugins.get('voxel-registry');
  if (!this.registry) throw new Error('voxel-decorative requires voxel-registry');

  this.recipes = game.plugins.get('voxel-recipes');
  if (!this.recipes) throw new Error('voxel-decorative requires voxel-recipes');

  this.enable();
}

DecorativePlugin.prototype.enable = function() {
  // "storage" blocks
  this.registry.registerBlock('blockCoal', {texture: 'coal_block', displayName: 'Block of Coal'});
  this.registry.registerBlock('blockIron', {texture: 'iron_block', displayName: 'Block of Iron'});
  this.registry.registerBlock('blockGold', {texture: 'gold_block', displayName: 'Block of Gold'});
  this.registry.registerBlock('blockDiamond', {texture: 'diamond_block', displayName: 'Block of Diamond'});

  // stone bricks
  this.registry.registerBlock('stoneBrick', {texture: 'stonebrick', displayName: 'Stone Bricks'});
  this.registry.registerBlock('stoneBrickCarved', {texture: 'stonebrick_carved', displayName: 'Carved Stone Bricks'});
  this.registry.registerBlock('stoneBrickCracked', {texture: 'stonebrick_cracked', displayName: 'Cracked Stone Bricks'});
  this.registry.registerBlock('stoneBrickMossy', {texture: 'stonebrick_mossy', displayName: 'Mossy Stone Bricks'});

  // TODO: recipes
};

DecorativePlugin.prototype.disable = function() {
  // TODO
};


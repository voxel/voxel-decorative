'use strict';

var ucfirst = require('ucfirst');

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

  this.storageMaterials = opts.storageMaterials || ['coal', 'iron', 'gold', 'diamond'];
  this.storageBases = opts.storageBases || {iron: 'ingotIron', gold: 'ingotIron'}; // TODO: refactor, metals? (always require ingots)

  this.enable();
}

DecorativePlugin.prototype.enable = function() {
  var registry = this.registry;
  var recipes = this.recipes;
  var self = this;

  // "storage" blocks
  this.storageMaterials.forEach(function(name) {
    registry.registerBlock('block' + ucfirst(name), {texture: name + '_block', displayName: 'Block of ' + ucfirst(name)});

    var baseMaterial = self.storageBases[name] || name;

    // blocking up TODO: require a compressor?
    recipes.registerAmorphous([
      baseMaterial, baseMaterial, baseMaterial,
      baseMaterial, baseMaterial, baseMaterial,
      baseMaterial, baseMaterial, baseMaterial], ['block' + ucfirst(name)]);

    // blocking down TODO: require a macerator?
    recipes.registerAmorphous(['block' + ucfirst(name)], [baseMaterial, 9]);
  });

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


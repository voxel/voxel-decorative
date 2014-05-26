'use strict';

var ucfirst = require('ucfirst');

module.exports = function(game, opts) {
  return new DecorativePlugin(game, opts);
};

module.exports.pluginInfo = {
  loadAfter: [
    'voxel-registry', 
    'voxel-land', // for materials
    'voxel-recipes']
};

function DecorativePlugin(game, opts) {
  this.registry = game.plugins.get('voxel-registry');
  if (!this.registry) throw new Error('voxel-decorative requires voxel-registry');

  this.recipes = game.plugins.get('voxel-recipes');
  if (!this.recipes) throw new Error('voxel-decorative requires voxel-recipes');

  this.storageMaterials = opts.storageMaterials || ['coal', 'iron', 'gold', 'diamond'];
  this.storageBases = opts.storageBases || {iron: 'ingotIron', gold: 'ingotIron'}; // TODO: refactor, metals? (always require ingots)
  this.storageHardnessFactor = opts.storageHardnessFactor || 2.0;

  this.enable();
}

DecorativePlugin.prototype.enable = function() {
  var registry = this.registry;
  var recipes = this.recipes;
  var self = this;

  // "storage" blocks
  this.storageMaterials.forEach(function(name) {
    var baseMaterial = self.storageBases[name] || name;
    var baseHardness = registry.getProp('ore' + ucfirst(baseMaterial), 'hardness') || 20.0;

    registry.registerBlock('block' + ucfirst(name), {
      texture: name + '_block',
      displayName: 'Block of ' + ucfirst(name),
      hardness: baseHardness * self.storageHardnessFactor,
      creativeTab: 'decorative'
    });

    // blocking up TODO: require a compressor?
    recipes.registerAmorphous([
      baseMaterial, baseMaterial, baseMaterial,
      baseMaterial, baseMaterial, baseMaterial,
      baseMaterial, baseMaterial, baseMaterial], ['block' + ucfirst(name)]);


    // blocking down TODO: require a macerator?
    recipes.registerAmorphous(['block' + ucfirst(name)], [baseMaterial, 9]);
  });

  // stone bricks
  var hardness = registry.getProp('cobblestone', 'hardness') || 10.0; // match stone hardness
  registry.registerBlock('stoneBrick', {texture: 'stonebrick', displayName: 'Stone Bricks', hardness: hardness, creativeTab: 'decorative'});
  registry.registerBlock('stoneBrickCarved', {texture: 'stonebrick_carved', displayName: 'Carved Stone Bricks', hardness: hardness, creativeTab: 'decorative'});
  registry.registerBlock('stoneBrickCracked', {texture: 'stonebrick_cracked', displayName: 'Cracked Stone Bricks', hardness: hardness, creativeTab: 'decorative'});
  registry.registerBlock('stoneBrickMossy', {texture: 'stonebrick_mossy', displayName: 'Mossy Stone Bricks', hardness: hardness, creativeTab: 'decorative'});

  recipes.registerPositional([
      ['stone', 'stone'],
      ['stone', 'stone']], ['stoneBrick']);

  recipes.registerAmorphous(['stoneBrick'], ['stoneBrickCarved']); // TODO: maybe require using on a chisel?
  recipes.registerAmorphous(['stoneBrickCarved'], ['stoneBrickCracked']);
  //recipes.registerAmorphous(['stoneBrickCracked', ['stoneBrick']);
  // TODO: recipe for mossy (+vines?)
};

DecorativePlugin.prototype.disable = function() {
  // TODO
};


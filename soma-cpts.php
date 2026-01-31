<?php
  /**
   * Plugin Name: Soma CPTs
   * Description: Registers Soma CPTs + taxonomies for headless CMS.
   */

  add_action('init', function () {
    $post_types = [
      'sound'   => 'Sound',
      'chakra'  => 'Chakra',
      'ritual'  => 'Ritual',
      'practice'=> 'Practice',
      'guide'   => 'Guide',
      'recipe'  => 'Recipe',
    ];

    foreach ($post_types as $slug => $label) {
      register_post_type($slug, [
        'label' => $label,
        'public' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => $slug,
        'graphql_plural_name' => $slug . 's',
        'supports' => ['title', 'editor', 'thumbnail'],
        'has_archive' => true,
      ]);
    }

    $taxonomies = [
      'dosha' => 'Dosha',
      'season' => 'Season',
      'intention' => 'Intention',
      'duration' => 'Duration',
      'format' => 'Format',
    ];

    foreach ($taxonomies as $slug => $label) {
      register_taxonomy($slug, array_keys($post_types), [
        'label' => $label,
        'public' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => $slug,
        'graphql_plural_name' => $slug . 's',
        'hierarchical' => false,
      ]);
    }
  });
<?php
/**
 * Soma Living Wellness — CPT + Taxonomy registration (WPGraphQL ready)
 * Drop into a custom plugin or your theme's functions.php.
 */

add_action('init', function () {
  $post_types = [
    'ritual' => 'Ritual',
    'practice' => 'Practice',
    'sound' => 'Sound',
    'chakra' => 'Chakra',
    'guide' => 'Guide',
    'recipe' => 'Recipe',
  ];

  foreach ($post_types as $slug => $label) {
    register_post_type($slug, [
      'label' => $label,
      'public' => true,
      'show_in_rest' => true,
      'show_in_graphql' => true,
      'graphql_single_name' => $slug,
      'graphql_plural_name' => $slug . 's',
      'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],
    ]);
  }

  $taxonomies = [
    'chakra' => 'Chakra',
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

if (function_exists('acf_add_local_field_group')) {
  acf_add_local_field_group([
    'key' => 'group_soma_content_core',
    'title' => 'Soma Content Core',
    'fields' => [
      ['key' => 'field_soma_summary', 'label' => 'Summary', 'name' => 'summary', 'type' => 'text'],
      ['key' => 'field_soma_duration_minutes', 'label' => 'Duration Minutes', 'name' => 'duration_minutes', 'type' => 'number'],
      ['key' => 'field_soma_media_type', 'label' => 'Media Type', 'name' => 'media_type', 'type' => 'select', 'choices' => [ 'audio' => 'Audio', 'video' => 'Video', 'text' => 'Text' ]],
      ['key' => 'field_soma_media_url', 'label' => 'Media URL', 'name' => 'media_url', 'type' => 'url'],
      ['key' => 'field_soma_hero_image', 'label' => 'Hero Image', 'name' => 'hero_image', 'type' => 'image', 'return_format' => 'url'],
      ['key' => 'field_soma_cta_label', 'label' => 'CTA Label', 'name' => 'cta_label', 'type' => 'text'],
      ['key' => 'field_soma_cta_url', 'label' => 'CTA URL', 'name' => 'cta_url', 'type' => 'url'],
      ['key' => 'field_soma_is_free_weekly', 'label' => 'Is Free Weekly', 'name' => 'is_free_weekly', 'type' => 'true_false'],
      ['key' => 'field_soma_free_window_start', 'label' => 'Free Window Start', 'name' => 'free_window_start', 'type' => 'date_time_picker'],
      ['key' => 'field_soma_free_window_end', 'label' => 'Free Window End', 'name' => 'free_window_end', 'type' => 'date_time_picker'],
      ['key' => 'field_soma_paid_after_window', 'label' => 'Paid After Window', 'name' => 'paid_after_window', 'type' => 'true_false'],
    ],
    'location' => [
      [
        ['param' => 'post_type', 'operator' => '==', 'value' => 'ritual'],
      ],
      [
        ['param' => 'post_type', 'operator' => '==', 'value' => 'practice'],
      ],
      [
        ['param' => 'post_type', 'operator' => '==', 'value' => 'sound'],
      ],
      [
        ['param' => 'post_type', 'operator' => '==', 'value' => 'guide'],
      ],
      [
        ['param' => 'post_type', 'operator' => '==', 'value' => 'recipe'],
      ],
    ],
  ]);

  acf_add_local_field_group([
    'key' => 'group_soma_chakra_fields',
    'title' => 'Chakra Fields',
    'fields' => [
      ['key' => 'field_chakra_order', 'label' => 'Order', 'name' => 'order', 'type' => 'number'],
      ['key' => 'field_chakra_theme_color', 'label' => 'Theme Color', 'name' => 'theme_color', 'type' => 'text'],
      ['key' => 'field_chakra_short_description', 'label' => 'Short Description', 'name' => 'short_description', 'type' => 'textarea'],
      ['key' => 'field_chakra_is_active', 'label' => 'Is Active', 'name' => 'is_active', 'type' => 'true_false', 'default_value' => 1],
      ['key' => 'field_chakra_element', 'label' => 'Element', 'name' => 'element', 'type' => 'text'],
      [
        'key' => 'field_chakra_themes',
        'label' => 'Themes',
        'name' => 'themes',
        'type' => 'repeater',
        'sub_fields' => [
          ['key' => 'field_chakra_theme_label', 'label' => 'Theme', 'name' => 'label', 'type' => 'text'],
        ],
      ],
      [
        'key' => 'field_chakra_imbalances',
        'label' => 'Imbalances',
        'name' => 'imbalances',
        'type' => 'repeater',
        'sub_fields' => [
          ['key' => 'field_chakra_imbalance_label', 'label' => 'Imbalance', 'name' => 'label', 'type' => 'text'],
        ],
      ],
      [
        'key' => 'field_chakra_practices',
        'label' => 'Practices',
        'name' => 'practices',
        'type' => 'repeater',
        'sub_fields' => [
          ['key' => 'field_chakra_practice_label', 'label' => 'Practice', 'name' => 'label', 'type' => 'text'],
        ],
      ],
      ['key' => 'field_chakra_mantra', 'label' => 'Mantra', 'name' => 'mantra', 'type' => 'text'],
      ['key' => 'field_chakra_sanskrit', 'label' => 'Sanskrit', 'name' => 'sanskrit', 'type' => 'text'],
      [
        'key' => 'field_chakra_governs',
        'label' => 'Governs',
        'name' => 'governs',
        'type' => 'repeater',
        'sub_fields' => [
          ['key' => 'field_chakra_governs_label', 'label' => 'Governs', 'name' => 'label', 'type' => 'text'],
        ],
      ],
      ['key' => 'field_chakra_tone', 'label' => 'Tone', 'name' => 'tone', 'type' => 'textarea'],
      ['key' => 'field_chakra_image', 'label' => 'Image', 'name' => 'image', 'type' => 'image', 'return_format' => 'array'],
    ],
    'location' => [
      [
        ['param' => 'post_type', 'operator' => '==', 'value' => 'chakra'],
      ],
    ],
  ]);

  acf_add_local_field_group([
    'key' => 'group_soma_ritual_details',
    'title' => 'Ritual Details',
    'fields' => [
      ['key' => 'field_ritual_label', 'label' => 'Ritual Label', 'name' => 'ritual_label', 'type' => 'text'],
      [
        'key' => 'field_ritual_steps',
        'label' => 'Ritual Steps',
        'name' => 'ritual_steps',
        'type' => 'repeater',
        'sub_fields' => [
          ['key' => 'field_ritual_step_title', 'label' => 'Step Title', 'name' => 'step_title', 'type' => 'text'],
          ['key' => 'field_ritual_step_body', 'label' => 'Step Body', 'name' => 'step_body', 'type' => 'textarea'],
        ],
      ],
    ],
    'location' => [
      [
        ['param' => 'post_type', 'operator' => '==', 'value' => 'ritual'],
      ],
    ],
  ]);

  acf_add_local_field_group([
    'key' => 'group_soma_sound_details',
    'title' => 'Sound Details',
    'fields' => [
      ['key' => 'field_sound_frequency', 'label' => 'Frequency (Hz)', 'name' => 'frequency_hz', 'type' => 'number'],
      ['key' => 'field_sound_copy', 'label' => 'Frequency Copy', 'name' => 'frequency_copy', 'type' => 'text'],
      ['key' => 'field_sound_audio_url', 'label' => 'Audio URL', 'name' => 'audio_url', 'type' => 'url'],
      ['key' => 'field_sound_color_hex', 'label' => 'Color Hex', 'name' => 'color_hex', 'type' => 'text'],
      ['key' => 'field_sound_description', 'label' => 'Description', 'name' => 'description', 'type' => 'textarea'],
      ['key' => 'field_sound_sort_order', 'label' => 'Sort Order', 'name' => 'sort_order', 'type' => 'number'],
      ['key' => 'field_sound_loopable', 'label' => 'Loopable', 'name' => 'loopable', 'type' => 'true_false'],
    ],
    'location' => [
      [
        ['param' => 'post_type', 'operator' => '==', 'value' => 'sound'],
      ],
    ],
  ]);

  acf_add_local_field_group([
    'key' => 'group_soma_practice_details',
    'title' => 'Practice Details',
    'fields' => [
      ['key' => 'field_practice_instructor', 'label' => 'Instructor', 'name' => 'instructor', 'type' => 'text'],
      [
        'key' => 'field_practice_difficulty',
        'label' => 'Difficulty',
        'name' => 'difficulty',
        'type' => 'select',
        'choices' => [
          'gentle' => 'Gentle',
          'steady' => 'Steady',
          'strong' => 'Strong',
        ],
      ],
      ['key' => 'field_practice_props', 'label' => 'Props', 'name' => 'props', 'type' => 'text'],
      ['key' => 'field_practice_sequence_notes', 'label' => 'Sequence Notes', 'name' => 'sequence_notes', 'type' => 'textarea'],
    ],
    'location' => [
      [
        ['param' => 'post_type', 'operator' => '==', 'value' => 'practice'],
      ],
    ],
  ]);
}

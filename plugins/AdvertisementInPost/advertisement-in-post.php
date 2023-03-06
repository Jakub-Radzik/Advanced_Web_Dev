<?php
/** 
 * Plugin Name:       Advertisement In Post
 * Plugin URI:        https://example.com/plugins/Advertisement In Post/ 
 * Description:       Display advertisement under post title
 * Version:           1.0
 * Author:            Jakub Radzik
 * Author URI:        http://localhost:8080
 * License:           GPL v2 or later 
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html 
 */

function ad_post_admin_actions_register_menu() {  
    add_options_page("Manage advertisements", "Advertisements", 'manage_options', "add_adv", "ad_post_admin_page", "dashicons-welcome-widgets-menus");    
} 
add_action('admin_menu', 'ad_post_admin_actions_register_menu'); 


function ad_post_admin_page() { 
                                          
    global $_POST; 
    $opAdList  =  is_array(get_option('ad_post_list')) ? get_option('ad_post_list') : [];
        
        // DELETE ADVERTISEMENT
        if(isset($_POST['id_value']) and $_POST['id_value']!=="") {
            unset($opAdList[$_POST['id_value']]);
            update_option('ad_post_list', $opAdList); 
            echo'<div class="notice notice-error is-dismissible"><p>Deleted advertisment.</p></div>';    
        } 

        // ADD NEW ADVERTISEMENT
        if(isset($_POST['ad_post_new']) and $_POST['ad_post_new']!=="") {
            if(strlen($_POST['ad_post_new']) > 10){
                array_push($opAdList, $_POST['ad_post_new']);
                update_option('ad_post_list', $opAdList); 
                echo'<div class="notice notice-success is-dismissible"><p>Added new advertisment.</p></div>';
            }
            else{
                update_option('ad_post_list', $opAdList); 
                echo'<div class="notice notice-error is-dismissible"><p>Content must be <strong>longer</strong> than 10 characters</p></div>'; 
            }    
        }
    ?>
    <div class="positioningAdmin">
        <form name="ad_post_add_new_form" method="post">
            <div class="center">
                <h1>New Advertisment</h1>
                <textarea name="ad_post_new" id="advertisementTextArea" type="text"></textarea>
                <button class="submitButton" type="submit">Add advertisement</button>
            </div>
        </form>
        <div>

        <div class="spaceAds center">
            <h1>Advertisements</h1>
            <?php foreach ($opAdList as $key=>$value) : ?>
                <form class='element' method='post' name='delete_post'>
                    <div>
                        <?= $value ?>
                    </div>
                    <input type='hidden' id='id_value' name='id_value' value=<?= $key ?> >
                    <button class='deleteButton' type='submit'>DELETE</button>
                </form>
            <?php endforeach ?>    
        </div>

    </div>
    </div>
    <?php
}

function insertBeforeContent($content){
    $opAdList  =  is_array(get_option('ad_post_list')) ? get_option('ad_post_list') : [];
    if(!empty($opAdList)){
        $randomElement = $opAdList[array_rand($opAdList, 1)];
        return "<div class='center' style='padding: 2rem; border: solid gray 2px; width: 100%'>$randomElement</div>".$content;
    }
    return $content;
}
add_filter('the_content', "insertBeforeContent");

function ad_post_register_styles() { 
    wp_register_style('ad_post_styles', plugins_url('/css/style.css', __FILE__)); 
    wp_enqueue_style('ad_post_styles'); 
} 
add_action('init', 'ad_post_register_styles');
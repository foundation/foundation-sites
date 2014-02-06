this["JST"] = this["JST"] || {};

this["JST"]["doc/templates/forum_post.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!--topic 1-->\n<div class="row post impressions new hide-for-small">\n   <div class="small-12 columns">\n      <ul class="post-count-spacing small-block-grid-2 large-block-grid-2">\n         ';
 if (comments_count > 0) { ;
__p += '\n         <li>\n            <div class="post-count new already-checked">\n               <a href="#">\n               <div class="post-count-container new already-checked">\n                  <span class="reply-count new-post already-checked">NEW</span>\n               </div>\n               <div class="total-post-count new total-replies">\n                  ';
 if (comments_count == 1) { ;
__p += '\n                  ' +
((__t = ( comments_count )) == null ? '' : __t) +
' Reply\n                  ';
 } else { ;
__p += '\n                  ' +
((__t = ( comments_count )) == null ? '' : __t) +
' Replies\n                  ';
 } ;
__p += '\n               </div>\n               </a>\n            </div>\n         </li>\n         ';
 } else { ;
__p += '\n        <li>\n          <div class="post-count new-general">\n            <a href="' +
((__t = ( url )) == null ? '' : __t) +
'">\n              <div class="post-count-container new-general">\n                <span class="reply-count new-general">NEW</span>\n              </div>\n            </a>\n          </div>\n          <a href="' +
((__t = ( url )) == null ? '' : __t) +
'"></a>\n        </li>\n         ';
 } ;
__p += '\n         <li>\n           <div class="post-description">\n               <h5 class="content-title">\n                  <a href="' +
((__t = ( url )) == null ? '' : __t) +
'">' +
((__t = ( title || "Untitled" )) == null ? '' : __t) +
'</a>\n               </h5>\n               <p class="author-name">\n                   By\n                   <span class="author">\n                      <strong>\n                        ' +
((__t = ( author_name )) == null ? '' : __t) +
'\n                        ';
 if (typeof(latest_comment_author_name) != "undefined") { ;
__p += ',';
 } ;
__p += '\n                      </strong>\n                   </span>\n                   ';
 if (typeof(latest_comment_author_name) != "undefined") { ;
__p += '\n                   <span class="by">last Reply by</span>\n                   <span class="when">\n                      <span class="author">\n                         <strong>' +
((__t = ( latest_comment_author_name )) == null ? '' : __t) +
'</strong>\n                      </span>\n                      about ' +
((__t = ( latest_comment_created_at_time_ago )) == null ? '' : __t) +
' ago\n                   </span>\n                   ';
 } else { ;
__p += '\n                   <span class="when">about ' +
((__t = ( created_at_time_ago )) == null ? '' : __t) +
' ago</span>\n                   ';
 } ;
__p += '\n               </p>\n\n               <div class="post-description copy">\n                   <p>' +
((__t = ( body )) == null ? '' : __t) +
'</p>\n               </div>\n            </div>\n         </li>\n      </ul>\n      <hr>\n   </div>\n</div>\n<!-- end topic 1 large -->\n\n<!-- start  topic 1 small -->\n<div class="row post impressions new show-for-small">\n   <div class="small-12 columns">\n      <ul class="post-count-spacing small-block-grid-2 large-block-grid-2">\n        ';
 if (comments_count > 0) { ;
__p += '\n        <li>\n            <div class="post-count new already-checked">\n               <a href="' +
((__t = ( url )) == null ? '' : __t) +
'">\n               <div class="post-count-container new already-checked">\n                  <span class="reply-count new-post already-checked">NEW</span>\n               </div>\n               ';
 if (comments_count > 0) { ;
__p += '\n               <div class="total-post-count new total-replies">\n                  ';
 if (comments_count == 1) { ;
__p += '\n                  ' +
((__t = ( comments_count )) == null ? '' : __t) +
' Reply\n                  ';
 } else { ;
__p += '\n                  ' +
((__t = ( comments_count )) == null ? '' : __t) +
' Replies\n                  ';
 } ;
__p += '\n               </div>\n               ';
 } ;
__p += '\n               </a>\n            </div>\n        </li>\n        ';
 } else { ;
__p += '\n        <li>\n          <div class="post-count new-general">\n            <a href="' +
((__t = ( url )) == null ? '' : __t) +
'">\n              <div class="post-count-container new-general">\n                <span class="reply-count new-general">NEW</span>\n              </div>\n            </a>\n          </div>\n          <a href="' +
((__t = ( url )) == null ? '' : __t) +
'"></a>\n        </li>\n        ';
 } ;
__p += '\n        <li>\n            <h5 class="content-title">\n               <a href="' +
((__t = ( url )) == null ? '' : __t) +
'">' +
((__t = ( title || "Untitled" )) == null ? '' : __t) +
'</a>\n            </h5>\n            <p class="author-name">\n               By\n               <span class="author">\n                  <strong>\n                    ' +
((__t = ( author_name )) == null ? '' : __t) +
'\n                    ';
 if (typeof(latest_comment_author_name) != "undefined") { ;
__p += ',';
 } ;
__p += '\n                  </strong>\n               </span>\n               ';
 if (typeof(latest_comment_author_name) != "undefined") { ;
__p += '\n               <span class="by">last Reply by</span>\n               <span class="when">\n                  <span class="author">\n                     <strong>' +
((__t = ( latest_comment_author_name )) == null ? '' : __t) +
'</strong>\n                  </span>\n                  about ' +
((__t = ( latest_comment_created_at_time_ago )) == null ? '' : __t) +
' ago\n               </span>\n               ';
 } else { ;
__p += '\n               <span class="when">about ' +
((__t = ( created_at_time_ago )) == null ? '' : __t) +
' ago</span>\n               ';
 } ;
__p += '\n            </p>\n        </li>\n      </ul>\n      <div class="post-description">\n         <div class="post-description copy">\n\n             <p>Having issues installing with Compass and can\'t find a fix online. $ foundation new test Creating ./test exist test... (continued)</p>\n\n         </div>\n      </div>\n      <hr>\n   </div>\n</div>\n<!--end topic 1 small-->';

}
return __p
};
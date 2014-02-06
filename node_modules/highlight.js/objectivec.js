module.exports = function(hljs) {
  var OBJC_KEYWORDS = {
    keyword:
      'int float while private char catch export sizeof typedef const struct for union ' +
      'unsigned long volatile static protected bool mutable if public do return goto void ' +
      'enum else break extern class asm case short default double throw register explicit ' +
      'signed typename try this switch continue wchar_t inline readonly assign property ' +
      'protocol self synchronized end synthesize id optional required implementation ' +
      'nonatomic interface super unichar finally dynamic IBOutlet IBAction selector strong ' +
      'weak readonly',
    literal:
    	'false true FALSE TRUE nil YES NO NULL',
    built_in:
      'NSString NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView ' +
      'UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread ' +
      'UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool ' +
      'UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray ' +
      'NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController ' +
      'UINavigationBar UINavigationController UITabBarController UIPopoverController ' +
      'UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController ' +
      'NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor ' +
      'UIFont UIApplication NSNotFound NSNotificationCenter NSNotification ' +
      'UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar ' +
      'NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection class ' +
      'UIInterfaceOrientation MPMoviePlayerController dispatch_once_t ' +
      'dispatch_queue_t dispatch_sync dispatch_async dispatch_once'
  };
  return {
    keywords: OBJC_KEYWORDS,
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: '\'',
        end: '[^\\\\]\'',
        illegal: '[^\\\\][^\']'
      },

      {
        className: 'preprocessor',
        begin: '#import',
        end: '$',
        contains: [
        {
          className: 'title',
          begin: '\"',
          end: '\"'
        },
        {
          className: 'title',
          begin: '<',
          end: '>'
        }
        ]
      },
      {
        className: 'preprocessor',
        begin: '#',
        end: '$'
      },
      {
        className: 'class',
        beginWithKeyword: true,
        end: '({|$)',
        keywords: 'interface class protocol implementation',
        contains: [{
          className: 'id',
          begin: hljs.UNDERSCORE_IDENT_RE
        }
        ]
      },
      {
        className: 'variable',
        begin: '\\.'+hljs.UNDERSCORE_IDENT_RE
      }
    ]
  };
};
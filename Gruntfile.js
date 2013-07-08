
module.exports = function (grunt) {

  var pkg = grunt.file.readJSON('package.json')
    , dev = pkg.devDependencies;

  // Automatically load grunt-* npm tasks
  grunt.util._.each(dev, function (ver, name) {
    if (/^grunt-/.test(name)) {
      grunt.loadNpmTasks(name);
    }
  });

  grunt.initConfig({
    pkg  : pkg,
    conf : {
      src   : 'src',        // source files (html templates, jsx, stylus...)
      build : 'build',      // development build
      dist  : 'dist',       // distribution build (minified)
      bower : 'components'  // bower components directory
    },
    browserify : {
      app : {
        options : {
          transform : [require('grunt-react').browserify]
        },
        files : {
          '<%= conf.build %>/js/app.js' : '<%= conf.src %>/js/**/*.jsx'
        }
      }
    },
    stylus : {
      app : {
        options : {
          compress : false
        },
        files : {
          '<%= conf.build %>/css/app.css' : '<%= conf.src %>/style/**/*.styl'
        }
      }
    },
    copy : {
      html : {
        options : {
          processContent : templateProcessor({
            development : true,
            production  : false
          })
        },
        files : {
          '<%= conf.build %>/index.html' : '<%= conf.src %>/index.html.tpl'
        }
      },
      components : {
        files : {
          '<%= conf.build %>/lib/react.js' :
            '<%= conf.bower %>/react/react.js'
        }
      },
      dist : {
        options : {
          processContent : templateProcessor({
            development : false,
            production  : true
          })
        },
        files : {
          '<%= conf.dist %>/index.html' : '<%= conf.src %>/index.html.tpl'
        }
      }
    },
    htmlmin : {
      dist : {
        options : {
          removeComments     : true,
          collapseWhitespace : true
        },
        files : {
          '<%= conf.dist %>/index.html' : '<%= conf.dist %>/index.html'
        }
      }
    },
    useminPrepare : {
      html : '<%= conf.dist %>/index.html',
      options : {
        dest : '<%= conf.dist %>'
      }
    },
    usemin : {
      html : '<%= conf.dist %>/index.html'
    },
    watch : {
      options : {
        livereload : true
      },
      jsx : {
        files : ['<%= conf.src %>/js/**/*.jsx'],
        tasks : ['browserify:app']
      },
      stylus : {
        files : ['<%= conf.src %>/style/**/*.styl'],
        tasks : ['stylus:app']
      }
    },
    connect : {
      build : {
        options : {
          base : '<%= conf.build %>'
        }
      },
      dist : {
        options : {
          base : '<%= conf.dist %>',
          keepalive : true
        }
      }
    },
    clean : {
      build : ['<%= conf.build %>'],
      dist  : ['<%= conf.dist %>']
    }
  });

  function templateProcessor (data) {
    data = grunt.util._.extend({ config:grunt.config }, data || {});
    return function (content, srcpath) {
      return grunt.template.process(content, { data:data });
    }
  }

  grunt.registerTask('default', ['build'])

  grunt.registerTask('build', [
    'clean:build',
    'browserify:app',
    'stylus:app',
    'copy:html',
    'copy:components'
  ]);

  grunt.registerTask('dist', [
    'build',
    'copy:dist',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('server:build', [
    'build',
    'connect:build',
    'watch'
  ]);

  grunt.registerTask('server:dist', [
    'dist',
    'connect:dist'
  ]);

};


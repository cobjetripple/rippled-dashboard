module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'compressed',
          loadPath: [
            'bower_components/foundation/scss/'
          ]
        },
        files: {
          'build/app.css': 'scss/app.scss'
        }
      }
    },
    exec: {
      'install-index': {
        cmd: function() {
          return 'cp index.html build/';
        }
      },
      'compile-bundle': {
        cmd: function() {
          return './compile-embedded-resources.py build/ dist/bundle.cpp';
        }
      }
    },
    uglify: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'build/app.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/d3/d3.js',
            'js/dashboard.js'
          ]
        },
      }
    },
    vulcanize: {
      default: {
        options: {
          inline: true
        },
        files: {
          'build/components.html': 'components.html'
        }
      }
    },
    watch: {
      scripts: {
        files: ['js/dashboard.js'],
        tasks: ['uglify:dist']
      },
      components: {
        files: ['chart.html', 'components.html'],
        tasks: ['vulcanize']
      },
      scss: {
        files: ['scss/*.scss'],
        tasks: ['sass:dist']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-vulcanize');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['exec:install-index', 'vulcanize', 'uglify:dist', 'sass:dist', 'exec:compile-bundle']);
}

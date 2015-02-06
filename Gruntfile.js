module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),





        // Takes your scss files and compiles them to css
        sass: {
          dist: {
            options: {
              style: 'expanded'
            },
            files: {
              'src/css/main.css': 'src/css/scss/main.scss'
            }
          }
        },





        // Assembles your email content with html layout
        assemble: {
          options: {
            layoutdir: 'src/layouts',
            data: 'src/constants.yml',
            flatten: true
          },
          pages: {
            src: ['src/emails/*.hbs'],
            dest: 'dist/'
          }
        },





        // Inlines your css
        premailer: {
          html: {
            options: {
              removeComments: true
            },
            files: [{
                expand: true,
                src: ['dist/*.html'],
                dest: ''
            }]
          },
          txt: {
            options: {
              mode: 'txt'
            },
            files: [{
                expand: true,
                src: ['dist/*.html'],
                dest: '',
                ext: '.txt'
            }]
          }
        },





        // Watches for changes to css or email templates then runs grunt tasks
        watch: {
          files: ['src/css/scss/*','src/emails/*','src/layouts/*'],
          tasks: ['default']
        },





        // Use Mailgun option if you want to email the design to your inbox or to something like Litmus
        // grunt send --template=transaction.html
        mailgun: {
          mailer: {
            options: {
              key: 'ACQUIRE-A-KEY', // Enter your Mailgun API key here
              sender: 'blep@bonk.com', // Change this
              recipient: 'beep@bork.com', // Change this 
              subject: 'WHOA SHIT I LOVE TESTING EMAILS ZOMG'
            },
            src: ['dist/'+grunt.option('template')]
          }
        },





        // Using images in your email? Rackspace that shit. 
        cloudfiles: {
          prod: {
            'user': 'Rackspace Cloud Username', // Change this
            'key': 'Rackspace Cloud API Key', // Change this
            'region': 'ORD', // Might need to change this
            'upload': [{
              'container': 'Files Container Name', // Change this
              'src': 'src/img/*',
              'dest': '/',
              'stripcomponents': 0
            }]
          }
        },

        // CDN will replace local paths with your Cloud CDN path
        cdn: {
          options: {
            cdn: 'Rackspace Cloud CDN URI', // Change this
            flatten: true,
            supportedTypes: 'html'
          },
          dist: {
            src: ['./dist/*.html']
          }
        },





        // Send your email template to Litmus for testing
        // grunt litmus --template=transaction.html
        litmus: {
          test: {
            src: ['dist/'+grunt.option('template')],
            options: {
              username: 'yours@email.com', // Change this
              password: 'PASSWORD', // Change this
              url: 'https://mathujones.litmus.com', // Change this
              clients: ['android4', 'aolonline', 'androidgmailapp', 'aolonline', 'ffaolonline',
              'chromeaolonline', 'appmail6', 'iphone6', 'ipadmini', 'ipad', 'chromegmailnew',
              'iphone6plus', 'notes85', 'ol2002', 'ol2003', 'ol2007', 'ol2010', 'ol2011',
              'ol2013', 'outlookcom', 'chromeoutlookcom', 'chromeyahoo', 'windowsphone8'] // https://#{company}.litmus.com/emails/clients.xml
            }
          }
        }

    });

    // Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-mailgun');
    grunt.loadNpmTasks('grunt-premailer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-cloudfiles');
    grunt.loadNpmTasks('grunt-cdn');
    grunt.loadNpmTasks('grunt-litmus');

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass','assemble','premailer']);

    // Use grunt send if you want to actually send the email to your inbox
    grunt.registerTask('send', ['mailgun']);

    // Upload images to our CDN on Rackspace Cloud Files
    grunt.registerTask('cdnify', ['default','cloudfiles','cdn']);

};

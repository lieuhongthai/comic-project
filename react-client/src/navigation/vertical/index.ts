// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types';

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboards',
      icon: 'mdi:home-outline',
      badgeContent: 'new',
      badgeColor: 'error',
      children: [
        {
          title: 'CRM',
          path: '/dashboards/crm'
        }
      ]
    },
    {
      sectionTitle: 'Apps & Pages'
    },
    {
      title: 'Email',
      icon: 'mdi:email-outline',
      path: '/apps/email'
    },
    {
      title: 'Chat',
      icon: 'mdi:message-outline',
      path: '/apps/chat'
    },
    {
      title: 'Calendar',
      icon: 'mdi:calendar-blank-outline',
      path: '/apps/calendar'
    },
    {
      title: 'Invoice',
      icon: 'mdi:file-document-outline',
      children: [
        {
          title: 'List',
          path: '/apps/invoice/list'
        },
        {
          title: 'Preview',
          path: '/apps/invoice/preview'
        },
        {
          title: 'Edit',
          path: '/apps/invoice/edit'
        },
        {
          title: 'Add',
          path: '/apps/invoice/add'
        }
      ]
    },
    {
      title: 'User',
      icon: 'mdi:account-outline',
      children: [
        {
          title: 'List',
          path: '/apps/user/list'
        },
        {
          title: 'View',
          children: [
            {
              title: 'Overview',
              path: '/apps/user/view/overview'
            },
            {
              title: 'Security',
              path: '/apps/user/view/security'
            },
            {
              title: 'Billing & Plans',
              path: '/apps/user/view/billing-plan'
            },
            {
              title: 'Notifications',
              path: '/apps/user/view/notification'
            },
            {
              title: 'Connection',
              path: '/apps/user/view/connection'
            }
          ]
        }
      ]
    },
    {
      sectionTitle: 'Component'
    },
    {
      badgeContent: '18',
      title: 'Components',
      icon: 'mdi:archive-outline',
      badgeColor: 'primary',
      children: [
        {
          title: 'Accordion',
          path: '/components/accordion'
        },
        {
          title: 'Alerts',
          path: '/components/alerts'
        },
        {
          title: 'Avatars',
          path: '/components/avatars'
        },
        {
          title: 'Badges',
          path: '/components/badges'
        },
        {
          title: 'Buttons',
          path: '/components/buttons'
        },
        {
          title: 'Button Group',
          path: '/components/button-group'
        },
        {
          title: 'Chips',
          path: '/components/chips'
        },
        {
          title: 'Dialogs',
          path: '/components/dialogs'
        },
        {
          title: 'List',
          path: '/components/lists'
        },
        {
          title: 'Menu',
          path: '/components/menu'
        },
        {
          title: 'Pagination',
          path: '/components/pagination'
        },
        {
          title: 'Ratings',
          path: '/components/ratings'
        },
        {
          title: 'Snackbar',
          path: '/components/snackbar'
        },
        {
          title: 'Swiper',
          path: '/components/swiper'
        },
        {
          title: 'Tabs',
          path: '/components/tabs'
        },
        {
          title: 'Timeline',
          path: '/components/timeline'
        },
        {
          title: 'Toasts',
          path: '/components/toast'
        },
        {
          title: 'Tree View',
          path: '/components/tree-view'
        },
        {
          title: 'More',
          path: '/components/more'
        }
      ]
    },
    {
      sectionTitle: 'Forms & Tables'
    },
    {
      title: 'Form Elements',
      icon: 'mdi:form-select',
      children: [
        {
          title: 'Text Field',
          path: '/forms/form-elements/text-field'
        },
        {
          title: 'Select',
          path: '/forms/form-elements/select'
        },
        {
          title: 'Checkbox',
          path: '/forms/form-elements/checkbox'
        },
        {
          title: 'Radio',
          path: '/forms/form-elements/radio'
        },
        {
          title: 'Custom Inputs',
          path: '/forms/form-elements/custom-inputs'
        },
        {
          title: 'Textarea',
          path: '/forms/form-elements/textarea'
        },
        {
          title: 'Autocomplete',
          path: '/forms/form-elements/autocomplete'
        },
        {
          title: 'Date Pickers',
          path: '/forms/form-elements/pickers'
        },
        {
          title: 'Switch',
          path: '/forms/form-elements/switch'
        },
        {
          title: 'File Uploader',
          path: '/forms/form-elements/file-uploader'
        },
        {
          title: 'Editor',
          path: '/forms/form-elements/editor'
        },
        {
          title: 'Slider',
          path: '/forms/form-elements/slider'
        },
        {
          title: 'Input Mask',
          path: '/forms/form-elements/input-mask'
        }
      ]
    },
    {
      icon: 'mdi:cube-outline',
      title: 'Form Layouts',
      path: '/forms/form-layouts'
    },
    {
      title: 'Form Validation',
      path: '/forms/form-validation',
      icon: 'mdi:checkbox-marked-circle-outline'
    },
    {
      title: 'Form Wizard',
      path: '/forms/form-wizard',
      icon: 'mdi:transit-connection-horizontal'
    },
    {
      title: 'Table',
      icon: 'mdi:grid-large',
      path: '/tables/mui'
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Material React Table',
      icon: 'mdi:grid',
      path: '/tables/material-react-table'
    },
    {
      title: 'Typography',
      icon: 'mdi:format-letter-case',
      path: '/ui/typography'
    },
    {
      title: 'Icons',
      path: '/ui/icons',
      icon: 'mdi:google-circles-extended'
    },
    {
      title: 'Icons',
      path: '/ui/dnd',
      icon: 'mdi:google-circles-extended'
    }
  ];
};

export default navigation;

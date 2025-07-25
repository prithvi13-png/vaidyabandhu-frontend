/**
 * Extracts file information from a given URL
 */
interface FileInfo {
    fullFilename: string;
    extension: string;
    filename: string;
    path: string;
    domain: string;
  }
  
  export function extractFileInfo(url: string): FileInfo {
    try {
      // Remove any query parameters
      const cleanUrl = url.split('?')[0];
      
      // Parse the URL
      const parsedUrl = new URL(cleanUrl);
      
      // Get the pathname
      const pathname = parsedUrl.pathname;
      
      // Split the pathname and get the last segment (full filename)
      const fullFilename = pathname.split('/').pop() || '';
      
      // Split filename into name and extension
      const parts = fullFilename.split('.');
      
      // Extract information
      const fileInfo: FileInfo = {
        fullFilename: fullFilename,
        extension: parts.length > 1 ? parts.pop()!.toLowerCase() : '',
        filename: parts.length > 1 ? parts.slice(0, -1).join('.') : fullFilename,
        path: pathname,
        domain: parsedUrl.hostname
      };
      
      return fileInfo;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error parsing URL:', error);
      
      // Fallback for invalid URLs
      return {
        fullFilename: '',
        extension: '',
        filename: '',
        path: '',
        domain: ''
      };
    }
  }
  
  // Additional utility functions
  export function getFileExtension(url: string): string {
    return extractFileInfo(url).extension;
  }
  
  export function getFileName(url: string): string {
    return extractFileInfo(url).filename;
  }
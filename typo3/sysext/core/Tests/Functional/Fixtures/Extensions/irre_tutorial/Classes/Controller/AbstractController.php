<?php

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

namespace OliverHader\IrreTutorial\Controller;

use OliverHader\IrreTutorial\Service\QueueService;
use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Extbase\Annotation as Extbase;
use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;
use TYPO3\CMS\Extbase\Mvc\RequestInterface;
use TYPO3\CMS\Extbase\Persistence\PersistenceManagerInterface;
use TYPO3\CMS\Extbase\Property\Exception;
use TYPO3\CMS\Extbase\Reflection\ObjectAccess;

/**
 * ContentController
 */
abstract class AbstractController extends ActionController
{
    /**
     * @Extbase\Inject
     * @var \TYPO3\CMS\Extbase\Persistence\Generic\Mapper\DataMapFactory
     */
    public $dataMapFactory;

    /**
     * @param \TYPO3\CMS\Extbase\Mvc\RequestInterface $request
     * @return \Psr\Http\Message\ResponseInterface
     * @throws \RuntimeException
     */
    public function processRequest(RequestInterface $request): ResponseInterface
    {
        try {
            return parent::processRequest($request);
        } catch (Exception $exception) {
            throw new \RuntimeException(
                $this->getRuntimeIdentifier() . ': ' . $exception->getMessage() . ' (' . $exception->getCode() . ')',
                1476049553
            );
        }
    }

    /**
     * @param \Iterator|\TYPO3\CMS\Extbase\DomainObject\AbstractEntity[] $iterator
     * @return array
     */
    protected function getStructure($iterator)
    {
        $structure = [];

        if (!$iterator instanceof \Iterator) {
            $iterator = [$iterator];
        }

        foreach ($iterator as $entity) {
            $dataMap = $this->dataMapFactory->buildDataMap(get_class($entity));
            $tableName = $dataMap->getTableName();
            $identifier = $tableName . ':' . $entity->getUid();
            $properties = ObjectAccess::getGettableProperties($entity);

            $structureItem = [];
            foreach ($properties as $propertyName => $propertyValue) {
                $columnMap = $dataMap->getColumnMap($propertyName);
                if ($columnMap !== null) {
                    $propertyName = $columnMap->getColumnName();
                }
                if ($propertyValue instanceof \Iterator) {
                    $structureItem[$propertyName] = $this->getStructure($propertyValue);
                } else {
                    $structureItem[$propertyName] = $propertyValue;
                }
            }
            $structure[$identifier] = $structureItem;
        }

        return $structure;
    }

    /**
     * @param mixed $value
     */
    protected function process($value)
    {
        if ($this->getQueueService()->isActive()) {
            $this->getQueueService()->addValue($this->getRuntimeIdentifier(), $value);
            $this->forward('process', 'Queue');
        }
        $this->view->assign('value', $value);
    }

    /**
     * @return string
     */
    protected function getRuntimeIdentifier()
    {
        $arguments = [];
        foreach ($this->request->getArguments() as $argumentName => $argumentValue) {
            $arguments[] = $argumentName . '=' . $argumentValue;
        }
        return $this->request->getControllerActionName() . '(' . implode(', ', $arguments) . ')';
    }

    /**
     * @return \TYPO3\CMS\Extbase\Persistence\PersistenceManagerInterface
     */
    protected function getPersistenceManager()
    {
        return $this->objectManager->get(PersistenceManagerInterface::class);
    }

    /**
     * @return \OliverHader\IrreTutorial\Service\QueueService
     */
    protected function getQueueService()
    {
        return $this->objectManager->get(QueueService::class);
    }
}
